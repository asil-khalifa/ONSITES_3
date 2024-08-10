import { Router } from "express";
import { createQuestion, readQuestion } from "../controllers/questions.js";


const questionRouter = Router();

questionRouter.get('/:id', readQuestion);
questionRouter.post('/', createQuestion);


export {questionRouter}