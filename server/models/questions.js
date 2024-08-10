import mongoose, { Schema } from "mongoose";


const questionModel = new Schema({
    question: {
        type: String,
        required: true,
    },
    tests: [
        {
            input: {
                type: String,
            },
            output: {
                type: String,
            }
        }
    ]
});

const Question = mongoose.models.Question || mongoose.model('Question', questionModel, 'questions');
export {Question};