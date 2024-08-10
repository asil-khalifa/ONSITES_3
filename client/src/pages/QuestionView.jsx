import { useEffect, useState } from "react";
import CodeEditor from "../components/CodeEditor";
import { axiosBase } from "../api/myAxios";
import { useParams } from "react-router-dom";

export default function QuestionView() {
  const [question, setQuestion] = useState('');

  const params = useParams();
  const id = params.id;

  async function getQuestion() {
    try {
      const response = await axiosBase.get(`/questions/${id}`);
      console.log(response);

      if (response.data.success){
        setQuestion(response.data.question);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getQuestion();
  })

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl mt-3">QUESTION:</h2>
      <h3 className="text-xl mt-3 mb-3">{question}</h3>
      <h4 className="text-md">Do not print anything except what is asked</h4>
        <CodeEditor/>
    </div>
  )
}
