import React, { useEffect, useState } from 'react'
import QuestionButton from '../components/QuestionButton';
import { axiosBase } from '../api/myAxios';

export default function Home() {

  const [questions, setQuestions] = useState([]);

  async function getQuestions() {
    try {
      const response = await axiosBase.get(`/questions`);
      console.log(response);

      if (response.data.success) {
        setQuestions(response.data.questions);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getQuestions();
  })


  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-4xl mt-3 mb-8'>A list of Questions:</h1>
      <div className='flex flex-col gap-4 w-[80vw]'>
        {questions.map(question => {
          return <QuestionButton question={question} />
        })}
      </div>
    </div>
  )
}
