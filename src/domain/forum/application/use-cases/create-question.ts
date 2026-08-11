import { UniqueEntityId } from "#/core/entities/unique-entity-id"
import { Question } from "#/domain/forum/enterprise/entities/question";
import { right, type Either } from "../../../../core/either.js";
import { QuestionAttachment } from "../../enterprise/entities/question-attachment.js";
import { QuestionAttachmentList } from "../../enterprise/entities/question-attatchment-list.js";
import type { QuestionsRepository } from "../repositories/questions-repository.js";

interface CreateQuestionRequest {
    authorId: string
    title: string
    content: string
    attachmentIds?: string[]

}

type CreateQuestionResponse = Either<Error, { question: Question }>
export class CreateQuestion{

    constructor (
        private questionsRepository: QuestionsRepository
    ) {}
    
    async execute({authorId,title,content, attachmentIds = []}: CreateQuestionRequest): Promise<CreateQuestionResponse> {

        const question = Question.create({
            authorId: new UniqueEntityId(authorId),
            title,
            content,
        })

                
        const questionAttachments = attachmentIds.map(attachmentId => {
            return QuestionAttachment.create({
                attachmentId: new UniqueEntityId(attachmentId) ,
                questionId: question.id
            })
        })
        
        question.attachments = new QuestionAttachmentList(questionAttachments)

        await this.questionsRepository.create(question)
        
        return right({
            question
        })
    }
}

