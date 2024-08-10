import axios from 'axios';
import { Question } from '../models/questions.js';

async function runCode(req, res){
    try {
        const { code, language, version, id } = req.body;
        console.log(code);
        const question = await Question.findById(id);
        if (!question) return res.json({success: false, message: 'invalidId'});
        const tests = question.tests;

        const testResults = [];

        for (let test of tests){

            const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
                "language": language,
                "version": version,
                "files": [
                    {
                        "content": code,
                    }
                ],
                "stdin": test.input,
            });

            let run = response.data.run;

            testResults.push({
                //remove trailing slash n
                passed: run.stdout.replace(/[\n\r]+$/, "")  === test.output.replace(/[\n\r]+$/, "") ,
                code: run.code,
                ouput: run.output,
                stdout: run.stdout,
                stderr: run.stderr,
            });


            // console.log(response.data.run);
            // console.log(test.output);
        }

        res.json({success: true, result: testResults});

    } catch (error) {
        console.log('error in POST /code', error);
        res.json({ success: false, message: '500' });
    }
}

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


export {runCode};