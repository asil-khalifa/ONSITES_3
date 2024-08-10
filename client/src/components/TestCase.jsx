import React from 'react'

export default function TestCase({ setInput, setOutput }) {
    return (
        <div className='flex flex-row justify-between mt-4 mb-4'>

            <textarea className='text-black block pl-3' name="" id="" onChange={e => setInput(e.target.value)}>
            </textarea>

            <textarea className='text-black block pl-3' name="" id="" onChange={e => setOutput(e.target.value)}>
            </textarea>
        </div>
    )
}
