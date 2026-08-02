import { UniqueEntityId } from "#/core/entities/unique-entity-id"
import { Question } from "#/domain/forum/enterprise/entities/question";
import type { QuestionsRepository } from "../repositories/questions-repository.js";

interface CreateQuestionRequest {
    authorId: string
    title: string
    content: string



}

interface CreateQuestionResponse{
    question: Question
}

export class CreateQuestion{

    constructor (
        private questionsRepository: QuestionsRepository
    ) {}
    
    async execute({authorId,title,content}: CreateQuestionRequest): Promise<CreateQuestionResponse> {
        const question = Question.create({
            authorId: new UniqueEntityId(authorId),
            title,
            content,
        })

        await this.questionsRepository.create(question)
        
        return {
            question
        }
    }
}

