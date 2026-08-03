import type { QuestionComment } from "../../enterprise/entities/question-comment.js";


export interface QuestionsCommentsRepository{
    create(questionComment: QuestionComment):Promise<QuestionComment>
    findById(questionCommentId: string):Promise<QuestionComment | null>
    delete(questionComment: QuestionComment):Promise<void>
}