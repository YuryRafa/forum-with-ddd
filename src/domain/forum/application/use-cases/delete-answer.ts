import type { AnswersRepository } from "#/domain/forum/application/repositories/answer-repository";

interface DeleteAnswerRequest {
    authorId: string
    answerId: string
}

interface DeleteAnswerResponse {}

export class DeleteAnswer {
    constructor(
        private answersRepository: AnswersRepository
    ) {}

    async execute({ authorId, answerId }: DeleteAnswerRequest): Promise<DeleteAnswerResponse> {
        const answer = await this.answersRepository.findById(answerId)

        if (!answer) {
            throw new Error('Answer not found')
        }

        if (authorId !== answer.authorId.toString()) {
            throw new Error("You're not allowed to delete that answer")
        }

        await this.answersRepository.delete(answer)

        return {}
    }
}
