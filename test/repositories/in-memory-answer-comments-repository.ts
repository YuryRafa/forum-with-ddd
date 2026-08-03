import type { AnswerCommentsRepository } from "../../src/domain/forum/application/repositories/answer-comments-repository.js"
import type { AnswerComment } from "../../src/domain/forum/enterprise/entities/answer-comment.js"

export class InMemoryAnswerCommentsRepository implements AnswerCommentsRepository{
    public items: AnswerComment[] = []

    async create(answerComment: AnswerComment): Promise<AnswerComment> {
        this.items.push(answerComment)
        return answerComment
    }

    async findById(answerCommentId: string): Promise<AnswerComment | null> {
        const answerComment = this.items.find((item) => item.id.toString() === answerCommentId)

        if (!answerComment) {
            return null
        }

        return answerComment
    }

    async delete(answerComment: AnswerComment): Promise<void> {
        const itemIndex = this.items.findIndex((item) => item.id.toString() === answerComment.id.toString())

        if (itemIndex >= 0) {
            this.items.splice(itemIndex, 1)
        }
    }

}