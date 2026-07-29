import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.js"
import { Answer } from "../../enterprise/entities/answer.js"
import type { AnswersRepository } from "../repositories/answer-repository.js"

interface AnswerQuestionInterface {

    instructorId: string
    questionId: string
    content: string

}

export class AnswerQuestion{

    constructor (
        private answersRepository: AnswersRepository
    ) {}
    
    async execute({instructorId, questionId, content}: AnswerQuestionInterface) {
        const answer = Answer.create({
            content,
            authorId: new UniqueEntityId(instructorId),
            questionId: new UniqueEntityId(questionId)
        })
        await this.answersRepository.create(answer)

        
        return answer
    }
}

