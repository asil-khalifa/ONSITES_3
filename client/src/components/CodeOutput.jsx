import React from 'react'

export default function CodeOutput(result) {
    const { stdout, stderr, output, passed} = result.result;

    // console.log(passed, stdout, stderr, output, code);

  return (
    <div className='flex flex-col gap-4 bg-[#121212] max-w-[87vw] mt-8 mb-4'>
        <h1 className={passed?'text-green-500':'text-red-500'}>Result: {passed? 'Passed':'Failed'}</h1>

        {stderr && <p><span className='text-red-300 text-xl'>STDERR: </span>{stderr}</p>}
        {output && <p><span className='text-yellow-300 text-xl'>OUTPUT: </span>{output}</p>}
        {<p><span className='text-green-300 text-xl'>STDOUT: </span>{stdout}</p>}
    
    </div>
  )
}
