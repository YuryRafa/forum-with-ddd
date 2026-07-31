import type { AnswersRepository } from "#/domain/forum/application/repositories/answer-repository";
import type { Answer } from "../../enterprise/entities/answer.js";

interface EditAnswerRequest {
    authorId: string
    answerId: string
    content: string

}

interface EditAnswerResponse{
    answer: Answer
}

export class EditAnswer{

    constructor (
        private answersRepository: AnswersRepository
    ) {}
    
    async execute({authorId, answerId, content}: EditAnswerRequest): Promise<EditAnswerResponse> {
        const answer = await this.answersRepository.findById(answerId)

        if (!answer){
            throw new Error('Answer not found')
        }

        if (authorId !== answer.authorId.toString()){
            throw new Error("You're not allowed to edit that answer ")
        }

        answer.content = content

        await this.answersRepository.save(answer)

        return {answer}
    }
}

