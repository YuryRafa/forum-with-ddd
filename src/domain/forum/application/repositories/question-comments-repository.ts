import type { PaginationParams } from "../../../../core/repositories/pagination-params.js"
import type { QuestionComment } from "../../enterprise/entities/question-comment.js";


export interface QuestionsCommentsRepository{
    create(questionComment: QuestionComment):Promise<QuestionComment>
    findById(questionCommentId: string):Promise<QuestionComment | null>
    findManyByQuestionId(questionId:string, {page}: PaginationParams): Promise<QuestionComment[]>
    delete(questionComment: QuestionComment):Promise<void>
}