import { Router } from "express";
import { runCode } from "../controllers/codes.js";


const codeRouter = Router();

codeRouter.post('/', runCode);

export {codeRouter};

