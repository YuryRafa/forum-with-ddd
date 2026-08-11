import { UniqueEntityId } from '#/core/entities/unique-entity-id'
import { AnswerAttachment, type AnswerAttachmentProps } from '../../src/domain/forum/enterprise/entities/answer-attachment.js'

export function makeAnswerAttachment(
    override: Partial<AnswerAttachmentProps> = {},
    id?: UniqueEntityId
) {
    const answerAttachment = AnswerAttachment.create({
        answerId: new UniqueEntityId(),
        attachmentId: new UniqueEntityId(),
        ...override,
    }, id)

    return answerAttachment
}
