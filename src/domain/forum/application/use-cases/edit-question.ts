import type { QuestionsRepository } from "../repositories/questions-repository.js";
import type { Question } from "../../enterprise/entities/question.js";

interface EditQuestionRequest {
    authorId: string,
    questionId: string
    title: string
    content: string

}

interface EditQuestionResponse{
    question: Question
}

export class EditQuestion{

    constructor (
        private questionsRepository: QuestionsRepository
    ) {}
    
    async execute({authorId, questionId, content, title}: EditQuestionRequest): Promise<EditQuestionResponse> {
        const question = await this.questionsRepository.findById(questionId)

        if (!question){
            throw new Error('Question not found')
        }

        if (authorId !== question.authorId.toString()){
            throw new Error("You're not allowed to edit that question ")
        }

        question.title = title
        question.content = content

        await this.questionsRepository.save(question)

        return {question}
    }
}

