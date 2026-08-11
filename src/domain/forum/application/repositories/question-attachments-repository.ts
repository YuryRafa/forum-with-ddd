import type { QuestionAttachment } from "../../enterprise/entities/answer-attachment.js"


export interface QuestionAttachmentsRepository{
    findManyByQuestionId(questionId: string):Promise<QuestionAttachment[]>

}