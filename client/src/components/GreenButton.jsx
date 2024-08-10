import React from 'react'

export default function GreenButton({text, clickFunc = () => {}}) {
  return (
    <button className='bg-green-500 text-white text-xl rounded-full px-2 py-1' onClick={clickFunc}>
        {text}
    </button>
  )
}
