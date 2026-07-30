import { UniqueEntityId } from "#/core/entities/unique-entity-id";
import { Answer } from "#/domain/forum/enterprise/entities/answer";
import type { AnswersRepository } from "#/domain/forum/application/repositories/answer-repository";

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

