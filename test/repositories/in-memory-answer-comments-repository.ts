import type { AnswerCommentsRepository } from "../../src/domain/forum/application/repositories/answer-comments-repository.js"
import type { AnswerComment } from "../../src/domain/forum/enterprise/entities/answer-comment.js"

export class InMemoryAnswerCommentsRepository implements AnswerCommentsRepository{
    public items: AnswerComment[] = []

    async create(answerComment: AnswerComment): Promise<AnswerComment> {
        this.items.push(answerComment)
        return answerComment
    }

}