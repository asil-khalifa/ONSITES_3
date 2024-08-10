
import express from 'express'
import cors from 'cors';
// import { exec } from 'child_process';
// import fs from 'fs';
import connectDb from './config/mongodb.js';
import 'dotenv/config'
import { questionRouter } from './routes/questions.js';
import { codeRouter } from './routes/codes.js';

const app = express();
connectDb();

app.use(cors({
    origin: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes:
app.use('/questions', questionRouter);
app.use('/codes', codeRouter);

app.get('/', (req, res) => res.send('Server online'));

app.listen(2006, () => console.log('Server online on 2006'));