import type { PaginationParams } from "../../../../core/repositories/pagination-params.js"
import type { AnswerComment } from "../../enterprise/entities/answer-comment.js";


export interface AnswerCommentsRepository{
    create(answerComment: AnswerComment):Promise<AnswerComment>
    findById(answerCommentId: string):Promise<AnswerComment | null>
    findManyByAnswerId(answerId: string, {page}: PaginationParams): Promise<AnswerComment[]>
    delete(answerComment: AnswerComment):Promise<void>
}