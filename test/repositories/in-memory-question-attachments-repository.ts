import type { QuestionAttachmentsRepository } from "../../src/domain/forum/application/repositories/question-attachments-repository.js";
import type { QuestionAttachment } from "../../src/domain/forum/enterprise/entities/answer-attachment.js";

export class InMemoryQuestionAttachmentsRepository implements QuestionAttachmentsRepository {
    
    public items: QuestionAttachment[] = []
    
    async findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]> {
        const questionAttachments = this.items
        .filter((item) => item.questionId.toString() === questionId)
        
        return questionAttachments
    }
    
}