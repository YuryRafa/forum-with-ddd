import { left, right, type Either } from "../../../../core/either.js";
import type { QuestionsRepository } from "../repositories/questions-repository.js";
import type { Question } from "../../enterprise/entities/question.js";
import { NotAllowedError } from "./errors/not-allowed-error.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";
import type { QuestionAttachmentsRepository } from "../repositories/question-attachments-repository.js";
import { QuestionAttachmentList } from "../../enterprise/entities/question-attatchment-list.js";
import { QuestionAttachment } from "../../enterprise/entities/answer-attachment.js";
import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.js";

interface EditQuestionRequest {
    authorId: string,
    questionId: string
    title: string
    content: string
    attachmentsIds: string[]

}

type EditQuestionResponse = Either<
    ResourceNotFoundError | NotAllowedError,
    { question: Question }
>

export class EditQuestion{

    constructor (
        private questionsRepository: QuestionsRepository,
        private questionAttachmentsRepository: QuestionAttachmentsRepository
    ) {}
    
    async execute({authorId, questionId, content, title, attachmentsIds}: EditQuestionRequest): Promise<EditQuestionResponse> {
        const question = await this.questionsRepository.findById(questionId)

        if (!question){
            return left(new ResourceNotFoundError())
        }

        if (authorId !== question.authorId.toString()){
            return left(new NotAllowedError())
        }

        const currentQuestionAttachments = await this.questionAttachmentsRepository.findManyByQuestionId(questionId)
        const questionAttachmentList = new QuestionAttachmentList(currentQuestionAttachments)

        const questionAttachments = attachmentsIds.map((attachmentId) => {
            return QuestionAttachment.create({
                attachmentId: new UniqueEntityId(attachmentId),
                questionId: question.id
            })
        })

        questionAttachmentList.update(questionAttachments)

        question.title = title
        question.content = content
        question.attachments = questionAttachmentList

        await this.questionsRepository.save(question)

        return right({question})
    }
}

