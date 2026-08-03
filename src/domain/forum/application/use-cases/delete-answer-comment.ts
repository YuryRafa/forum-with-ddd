import { AnswerComment } from '../../enterprise/entities/answer-comment.js'
import type { AnswerCommentsRepository } from '../repositories/answer-comments-repository.js'

interface DeleteAnswerCommentRequest {
    authorId: string
    answerCommentId: string
}

interface DeleteAnswerCommentResponse {}

export class DeleteAnswerComment {
    constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

    async execute({ authorId, answerCommentId }: DeleteAnswerCommentRequest): Promise<DeleteAnswerCommentResponse> {
        const answerComment = await this.answerCommentsRepository.findById(answerCommentId)

        if (!answerComment) {
            throw new Error('Comment not found')
        }

        if (authorId !== answerComment.authorId.toString()) {
            throw new Error('No allowed')
        }

        await this.answerCommentsRepository.delete(answerComment)

        return {}
    }
}
