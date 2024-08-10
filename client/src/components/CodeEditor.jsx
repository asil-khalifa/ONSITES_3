import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import { useRef, useState } from 'react';
import CodeOutput from './CodeOutput';
import { axiosBase } from '../api/myAxios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';


export default function CodeEditor() {
    const editorRef = useRef(null);
    const monacoRef = useRef(null);


    //! implement setting up from backend:
    const [language, setLanguage] = useState('python');
    const params = useParams();
    const {id} = params;
    
    const version = "3.10.0";

    const [code, setCode] = useState('');

    const [results, setResults] = useState([]);
    const [allCorrect, setAllCorrect] = useState(false);

    function handleEditorMount(editor, monaco) {
        editorRef.current = editor;
        monacoRef.current = monaco;
    }

    function handleCodeChange(code_) {
        setCode(code_);
    }

    async function handleRunCode(e) {
        try {
            const response = await toast.promise(
                axiosBase.post('/codes', {
                    code: code,
                    language: language,
                    id: id

                }),
                {
                    pending: 'Please Wait... Checking'
                }
            )

            console.log(response);

            if (response.data.success) {
                toast.success('Check the results below');

                console.log(response.data.result);
                let newResult = response.data.result;
                setResults(newResult);

                setAllCorrect(() => {
                    if (newResult.find(result => !result.passed)) return false;
                    return true;
                })

            }
            else {
                toast.error('Check your code! It crashed.');
            }

        } catch (error) {
            toast.error('Some error occured, try later');
            console.log(error);
        }

    }

    function languageSelectHandler(e) {
        e.preventDefault();
        setLanguage(e.target.value);
        console.log(e.target.value);
    }

    return (
        <>
            <button className='mb-5 mt-2 bg-green-800 rounded-xl px-2 py-1' onClick={handleRunCode}>Run Code</button>

            <form>
                <select onChange={languageSelectHandler} className='text-xl text-black bg-slate-400'>
                    <option value="python">Python</option>
                    <option value="c">C</option>
                    <option value="cpp">C++</option>
                </select>
            </form>

            <Editor className='mt-5' height="75vh" width="90vw"
                defaultLanguage="python" theme='vs-dark'
                language={language}
                defaultValue=''
                onMount={handleEditorMount}
                onChange={handleCodeChange}
            />
            {results.length > 0 && <h2 className='mt-5'>{allCorrect ? 'Congrats! all tests passed' : 'Some tests have failed'}</h2>}
            {results.length > 0 && results.map((result, idx) => {
                return <CodeOutput key={idx} result={result} />
            })
            }
        </>
    )
}
