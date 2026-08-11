import { UniqueEntityId } from "#/core/entities/unique-entity-id";
import { Answer } from "#/domain/forum/enterprise/entities/answer";
import { right, type Either } from "../../../../core/either.js";
import type { AnswersRepository } from "../repositories/answers-repository.js";
import { AnswerAttachment } from "../../enterprise/entities/answer-attachment.js";
import { AnswerAttachmentList } from "../../enterprise/entities/answer-attatchment-list.js";

interface AnswerQuestionRequest {

    instructorId: string
    questionId: string
    content: string
    attachmentIds?: string[]

}

type AnswerQuestionResponse = Either<Error, {answer: Answer}>


export class AnswerQuestion{

    constructor (
        private answersRepository: AnswersRepository
    ) {}
    
    async execute({instructorId, questionId, content, attachmentIds = []}: AnswerQuestionRequest):Promise<AnswerQuestionResponse> {
        const answer = Answer.create({
            content,
            authorId: new UniqueEntityId(instructorId),
            questionId: new UniqueEntityId(questionId)
        })

        const answerAttachments = attachmentIds.map((attachmentId) => {
            return AnswerAttachment.create({
                attachmentId: new UniqueEntityId(attachmentId),
                answerId: answer.id
            })
        })

        answer.attachments = new AnswerAttachmentList(answerAttachments)

        await this.answersRepository.create(answer)

        
        return right({answer})
    }
}

