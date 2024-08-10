import { Question } from "../models/questions.js";

async function createQuestion(req, res) {
    try {
        const {question, tests} = req.body;
        if (!question || !tests) return res.json({success: false, message: 'empty'});

        const fullQuestion = Question({
            question: question,
            tests: tests,
        });

        await fullQuestion.save();

        return res.json({success: true,});
    } catch (error) {
        console.log('error in creatQuestion controller', error);
        res.json({success: false, error: '500'});
    }
}

async function readQuestion(req, res) {
    try {
        const {id} = req.params;
        const questionFull = await Question.findById(id);
        if (!questionFull) return res.json({success: false, message: 'invalidId'});
        console.log(questionFull);

        return res.json({success: true, question: questionFull.question});
        
    } catch (error) {
        console.log(error);
        return res.json({success: false, message: '500'});
        
    }
}

export {createQuestion, readQuestion}