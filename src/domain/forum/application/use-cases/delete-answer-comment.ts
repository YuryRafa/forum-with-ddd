import { left, right, type Either } from '../../../../core/either.js'
import { AnswerComment } from '../../enterprise/entities/answer-comment.js'
import type { AnswerCommentsRepository } from '../repositories/answer-comments-repository.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'
import { NotAllowedError } from './errors/not-allowed-error.js'

interface DeleteAnswerCommentRequest {
    authorId: string
    answerCommentId: string
}

type DeleteAnswerCommentResponse = Either<
    ResourceNotFoundError | NotAllowedError,
    {}
>

export class DeleteAnswerComment {
    constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

    async execute({ authorId, answerCommentId }: DeleteAnswerCommentRequest): Promise<DeleteAnswerCommentResponse> {
        const answerComment = await this.answerCommentsRepository.findById(answerCommentId)

        if (!answerComment) {
            return left(new ResourceNotFoundError())
        }

        if (authorId !== answerComment.authorId.toString()) {
            return left(new NotAllowedError())
        }

        await this.answerCommentsRepository.delete(answerComment)

        return right({})
    }
}
