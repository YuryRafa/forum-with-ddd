import { left, right, type Either } from "../../../../core/either.js";
import type { AnswersRepository } from "../repositories/answers-repository.js";
import type { Answer } from "../../enterprise/entities/answer.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";
import { NotAllowedError } from "./errors/not-allowed-error.js";
import type { AnswerAttachmentsRepository } from "../repositories/answer-attachments-repository.js";
import { AnswerAttachmentList } from "../../enterprise/entities/answer-attatchment-list.js";
import { AnswerAttachment } from "../../enterprise/entities/answer-attachment.js";
import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.js";

interface EditAnswerRequest {
    authorId: string
    answerId: string
    content: string
    attachmentsIds: string[]

}

type EditAnswerResponse = Either<
    ResourceNotFoundError | NotAllowedError,
    { answer: Answer }
>

export class EditAnswer{

    constructor (
        private answersRepository: AnswersRepository,
        private answerAttachmentsRepository: AnswerAttachmentsRepository
    ) {}
    
    async execute({authorId, answerId, content, attachmentsIds}: EditAnswerRequest): Promise<EditAnswerResponse> {
        const answer = await this.answersRepository.findById(answerId)

        if (!answer){
            return left(new ResourceNotFoundError())
        }

        if (authorId !== answer.authorId.toString()){
            return left(new NotAllowedError())
        }

        const currentAnswerAttachments = await this.answerAttachmentsRepository.findManyByAnswerId(answerId)
        const answerAttachmentList = new AnswerAttachmentList(currentAnswerAttachments)

        const answerAttachments = attachmentsIds.map((attachmentId) => {
            return AnswerAttachment.create({
                attachmentId: new UniqueEntityId(attachmentId),
                answerId: answer.id
            })
        })

        answerAttachmentList.update(answerAttachments)

        answer.content = content
        answer.attachments = answerAttachmentList

        await this.answersRepository.save(answer)

        return right({answer})
    }
}

