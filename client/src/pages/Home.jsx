import React from 'react'

export default function Home() {

    const [questions, setQuestions] = useState('');
  
    async function getQuestions() {
      try {
        const response = await axiosBase.get(`/questions`);
        console.log(response);
  
        if (response.data.success){
          setQuestions(response.data.question);
        }
      } catch (error) {
        console.log(error);
      }
    }
  
    useEffect(() => {
      getQuestions();
    })


  return (
    <div>
        <h1 className='text-4xl mt-3'>A list of Questions:</h1>
        {questions.map(question => {
            return 
        })}
    </div>
  )
}
