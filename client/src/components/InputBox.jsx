import React from 'react'

export default function InputBox({ value, setValue, heading, fullScreen=false, type='text' }) {
    return (
        <>
            <h2 className='mb-3 text-lg'>{heading}</h2>
            <input type={type} onChange={e => setValue(e.target.value)} value={value} className={`bg-slate-300 px-3 py-4 mb-6 rounded-lg text-black font-semibold ${fullScreen?'w-[75vw]':''}`} />
        </>


    )
}
