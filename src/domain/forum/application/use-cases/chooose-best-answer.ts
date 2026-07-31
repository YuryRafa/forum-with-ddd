import { UniqueEntityId } from "#/core/entities/unique-entity-id";
import { Answer } from "#/domain/forum/enterprise/entities/answer";
import type { AnswersRepository } from "#/domain/forum/application/repositories/answer-repository";
import type { Question } from "../../enterprise/entities/question.js";
import type { QuestionsRepository } from "../repositories/question-repository.js";

interface ChooseBestAsnwerRequest {
    answerId: string
    authorId: string

}

interface ChooseBestAsnwerResponse {
    question: Question
}

export class ChooseBestAnswer{

    constructor (
        private questionsRepository: QuestionsRepository,
        private answersRepository: AnswersRepository
    ) {}
    
    async execute({answerId, authorId}: ChooseBestAsnwerRequest):Promise<ChooseBestAsnwerResponse> {
        const answer = await this.answersRepository.findById(answerId)

        if(!answer){
            throw new Error("Answer not found")
        }

        const question = await this.questionsRepository.findById(answer.questionId.toString())

        if (!question){
           throw new Error("Question not found") 
        }

        if( authorId !== question.authorId.toString()){
            throw new Error("Not Allowed")

        }

        question.bestAnswerId = answer.id
        
        await this.questionsRepository.save(question)
        
        return {question}
    }
}

