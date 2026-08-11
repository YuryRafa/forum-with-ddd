import { UniqueEntityId } from '#/core/entities/unique-entity-id'
import { QuestionAttachment, type QuestionAttachmentProps } from '../../src/domain/forum/enterprise/entities/question-attachment.js'

// the override Partial turn all properties of QuestionAttachmentProps to optional
export function makeQuestionAttachment(
    override: Partial<QuestionAttachmentProps> = {},
    id?: UniqueEntityId
) { 

    const questionattachment = QuestionAttachment.create({
        questionId: new UniqueEntityId(),
        attachmentId: new UniqueEntityId(),
        ...override

    }, id,)

    return questionattachment

}