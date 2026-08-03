import type { QuestionsCommentsRepository } from "../../src/domain/forum/application/repositories/question-comments-repository.js"
import type { QuestionComment } from "../../src/domain/forum/enterprise/entities/question-comment.js"

export class InMemoryQuestionCommentsRepository implements QuestionsCommentsRepository{
    public items: QuestionComment[] = []

    async create(questionComment: QuestionComment): Promise<QuestionComment> {
        this.items.push(questionComment)
        return questionComment
    }

    async findById(questionCommentId: string): Promise<QuestionComment | null> {
        const question = this.items.find(item => item.id.toString() === questionCommentId)
        return question ?? null
    }
    async delete(questionComment: QuestionComment): Promise<void> {
        const foundIndex = this.items.findIndex(item => item.id.toString() == questionComment?.id.toString())
        if (foundIndex === -1) {
            return
        }
        this.items.splice(foundIndex, 1)
    }

}