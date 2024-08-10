import { Question } from '../models/questions.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { writeFile } from 'fs/promises';

import { exec as exec_ } from 'child_process';
import util from 'util';

const exec = util.promisify(exec_);

async function runCode(req, res) {
    try {
        // const { code, language, version, id } = req.body;
        const { code, language, id } = req.body;

        const question = await Question.findById(id);
        if (!question) return res.json({ success: false, message: 'invalidId' });
        const tests = question.tests;
        console.log(tests);
        
        const filenameMap = {
            // 'node': 'sandbox.js',
            'python': 'sandbox.py',
            'c': 'sandbox.c',
            'cpp': 'sandbox.cpp'
        };

        const dockerFolderMap = {
            // 'node': 'Dockers/node',
            'python': 'Dockers/python',
            'c': 'Dockers/c',
            'cpp': 'Dockers/cpp'
        };

        const filename = filenameMap[language];

        if (!filename) {
            return res.status.json({ success: false, error: 'Unsupported language' });
        }

        //writing the files:
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        const filePath = path.join(__dirname, '..', dockerFolderMap[language], filename);
        fs.writeFileSync(filePath, code);
        //stdin file
        const stdinFilePath = path.join(__dirname, '..', dockerFolderMap[language], 'stdin.txt');

        //docker commands:
        const dockerImage = `code_executor_${language}`;
        const dockerCommand1 = `docker build -t ${dockerImage} ${dockerFolderMap[language]}`;
        const dockerCommand2 = `docker run --rm ${dockerImage}`;

        const testResults = [];

        
        for (let test of tests) {
            
            let stdin = test.input ? test.input : '';
            await writeFile(stdinFilePath, stdin);
            await exec(dockerCommand1, { timeout: 2.5 * 60 * 1000 });
            // console.log('written', Date.now());
            // console.log(stdin);
            try {
                const { stdout, stderr } = await exec(dockerCommand2, { timeout: 60 * 1000 });
                // console.log(stdout, stderr);

                testResults.push({
                    passed: stdout.trim() === test.output.trim(),
                    stdout,
                    stderr,
                });
                // console.log('no error', Date.now());
                
            } catch (error) {
                testResults.push({
                    passed: false,
                    stdout: "",
                    stderr: "",
                })
                // console.log('yes error', Date.now());
            }


        }

        res.json({ success: true, result: testResults });


    } catch (error) {
        console.log('error in POST /code', error);
        res.json({ success: false, message: '500' });
    }
}

//? This is the old code I used when using an external api to execute code files:
// async function oldRunCode(req, res){
//     try {
//         const { code, language, version, id } = req.body;
//         console.log(code);
//         const question = await Question.findById(id);
//         if (!question) return res.json({success: false, message: 'invalidId'});
//         const tests = question.tests;

//         const testResults = [];

//         for (let test of tests){

//             const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
//                 "language": language,
//                 "version": version,
//                 "files": [
//                     {
//                         "content": code,
//                     }
//                 ],
//                 "stdin": test.input,
//             });

//             let run = response.data.run;

//             testResults.push({
//                 passed: run.stdout.replace(/[\n\r]+$/, "")  === test.output.replace(/[\n\r]+$/, "") ,
//                 code: run.code,
//                 ouput: run.output,
//                 stdout: run.stdout,
//                 stderr: run.stderr,
//             });

//         }

//         res.json({success: true, result: testResults});

//     } catch (error) {
//         console.log('error in POST /code', error);
//         res.json({ success: false, message: '500' });
//     }
// }

//? This is the old code where I was running the files locally:

// const filePath = './user_files/temp.cjs';
// fs.writeFileSync(filePath, code);

// exec(`node ${filePath}`, {
//     timeout: 5 * 1000,
// },
//     (error, stdout, stderr) => {
//         console.log('inside');
//         if (error) {
//             console.log('error inside exec: ', error);
//             return res.json({ success: false, errorValue: error });
//         }
//         return res.json({ success: true, output: stdout, errorValue: stderr });

//     })


export { runCode };