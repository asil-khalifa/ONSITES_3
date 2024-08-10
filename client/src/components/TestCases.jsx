import TestCase from "./TestCase";

export default function TestCases({ setTests, tests, number }) {
    let testcases = [];
    function handleTestChange(type, index, val) {
        setTests(t => {
            return t.map((obj, idx) => {
                if (idx === index) return { ...obj, [type]: val }
                else return obj;
            })
        })
    }
    console.log(tests);
    if (1 <= number <= 5) {
        for (let i = 0; i < number; i++) {
            testcases.push(<TestCase
                setInput={val => handleTestChange('input', i, val)}
                setOutput={val => handleTestChange('output', i, val)}
                key={i} />)
        }
    }

    return (
        <>
            <div className='flex flex-row justify-between'>
                <h2>Input</h2>
                <h2>Output</h2>
            </div>
            {testcases}
        </>

    )
}
