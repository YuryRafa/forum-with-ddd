import type { QuestionsCommentsRepository } from "../../src/domain/forum/application/repositories/question-comments-repository.js"
import type { QuestionComment } from "../../src/domain/forum/enterprise/entities/question-comment.js"

export class InMemoryQuestionCommentsRepository implements QuestionsCommentsRepository{
    public items: QuestionComment[] = []

    async create(questionComment: QuestionComment): Promise<QuestionComment> {
        this.items.push(questionComment)
        return questionComment
    }

}