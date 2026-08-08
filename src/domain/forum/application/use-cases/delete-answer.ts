import { left, right, type Either } from "../../../../core/either.js";
import type { AnswersRepository } from "../repositories/answers-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";
import { NotAllowedError } from "./errors/not-allowed-error.js";

interface DeleteAnswerRequest {
    authorId: string
    answerId: string
}

type DeleteAnswerResponse = Either<
    ResourceNotFoundError | NotAllowedError,
    {}
>

export class DeleteAnswer {
    constructor(
        private answersRepository: AnswersRepository
    ) {}

    async execute({ authorId, answerId }: DeleteAnswerRequest): Promise<DeleteAnswerResponse> {
        const answer = await this.answersRepository.findById(answerId)

        if (!answer) {
            return left(new ResourceNotFoundError())
        }

        if (authorId !== answer.authorId.toString()) {
            return left(new NotAllowedError())
        }

        await this.answersRepository.delete(answer)

        return right({})
    }
}
