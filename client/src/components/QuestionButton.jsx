import React from 'react'
import GreenButton from './GreenButton';
import { useNavigate } from 'react-router-dom';

export default function QuestionButton({question}) {
  const navigate = useNavigate();
  let text = question.question;
  if (text.length > 25) text = text.slice(0, 25)+'...';

  return (
    <div className='w-[80%] bg-[#121212] flex justify-between gap-2 rounded-full px-4 py-2'>
        <h2 className='text-2xl'>{text}</h2>
        <GreenButton text='Attempt' clickFunc={() => navigate(`/questions/${question._id}`)}/>
    </div>
  )
}
