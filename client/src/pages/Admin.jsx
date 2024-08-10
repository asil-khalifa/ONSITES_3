import { useState } from "react";
import InputBox from "../components/InputBox";
import TestCases from "../components/TestCases";
import GreenButton from "../components/GreenButton";
import { toast } from "react-toastify";
import { axiosBase } from "../api/myAxios";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();

  const [question, setQuestion] = useState('');
  const [testNo, setTestNo] = useState(1);
  const [tests, setTests] = useState([
    { input: '', output: '' }
  ]);

  function validate() {
    if (tests.length < 1 || tests.length > 5) return false;
    if (!question) return false;
    return true;
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    try {
      const formData = {
        question,
        tests,
      }
      const response = await toast.promise(axiosBase.post('/questions', formData), {
        pending: 'Submitting...'
      });
      console.log(response);

      if (response.data.success) {
        toast.success('Successfully added Question');
        navigate('/');
      }
      else {
        toast.warn('Some error happend');
      }
    } catch (error) {
      console.log(error);
      toast.error('Some error happend');

    }
  }

  function handleChangeTests(val) {
    setTestNo(val);
    if (val >= 1 && val <= 5) {

      let tests_ = [];
      for (let i = 0; i < val; i++) {
        tests_.push({ input: '', output: '' });
      }

      setTests(tests_);
    }
  }

  return (
    <div className="flex flex-col items-start mt-8 ml-6">
      <h1 className="text-4xl mb-12">Create a new Question:</h1>

      <form onSubmit={handleFormSubmit}>
        <InputBox value={question} setValue={setQuestion} heading='Question' fullScreen />
        <InputBox value={testNo} setValue={val => handleChangeTests(val)} heading='No. of tests (1 to 5)' type="number" />
        <TestCases setTests={setTests} tests={tests} number={testNo} />
        <GreenButton text='Submit'></GreenButton>
      </form>

    </div>
  )
}
