import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import { useRef, useState } from 'react';
import CodeOutput from './CodeOutput';
import { axiosBase } from '../api/myAxios';


export default function CodeEditor() {
    const editorRef = useRef(null);
    const monacoRef = useRef(null);


    //! implement setting up from backend:
    const [language, setLanguage] = useState('python');
    const [id, setId] = useState('66b711ca32e645b3553803bb');
    const version = "3.10.0";

    const [code, setCode] = useState('');
    const [results, setResults] = useState([]);
    const [allCorrect, setAllCorrect] = useState(false);

    function handleEditorMount(editor, monaco) {
        editorRef.current = editor;
        monacoRef.current = monaco;
    }

    function showValue() {
        alert(editorRef.current.getValue());
    }

    function handleCodeChange(code_) {
        setCode(code_);
    }

    async function handleRunCode(e) {
        try {
            const response = await axiosBase.post('/codes', {
                code: code,
                language: language,
                version: version,
                id: id

            });

            console.log(response);
            if (response.data.success) {
                console.log(response.data.result);
                let newResult = response.data.result;
                setResults(newResult);

                setAllCorrect(() => {
                    if (newResult.find(result => !result.passed)) return false;
                    return true;
                })
                // newResult.forEach(result => console.log(result));

            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            {/* <button onClick={showValue}>Show Value</button> */}
            <button className='mb-5 mt-2 bg-green-800 rounded-xl px-2 py-1' onClick={handleRunCode}>Run Code</button>
            <Editor className='mt-5' height="82vh" width="90vw" defaultLanguage="javascript" theme='vs-dark' defaultValue=''
                onMount={handleEditorMount}
                onChange={handleCodeChange}
            />
            {results.length>0 && <h2 className='mt-5'>{allCorrect ? 'Congrats! all tests passed': 'Some tests have failed'}</h2>}
            {results.length > 0 && results.map((result, idx) => {
                return <CodeOutput key={idx} result={result} />
            })
            }
        </>
    )
}
