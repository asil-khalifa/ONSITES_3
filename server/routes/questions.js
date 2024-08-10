import { Router } from "express";
import { createQuestion, questionsList, readQuestion } from "../controllers/questions.js";


const questionRouter = Router();

questionRouter.get('/', questionsList)
questionRouter.get('/:id', readQuestion);
questionRouter.post('/', createQuestion);


export {questionRouter}