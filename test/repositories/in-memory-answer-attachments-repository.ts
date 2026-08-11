import type { AnswerAttachmentsRepository } from "../../src/domain/forum/application/repositories/answer-attachments-repository.js";
import type { AnswerAttachment } from "../../src/domain/forum/enterprise/entities/answer-attachment.js";

export class InMemoryAnswerAttachmentsRepository implements AnswerAttachmentsRepository {
    public items: AnswerAttachment[] = []

    async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
        return this.items.filter((item) => item.answerId.toString() === answerId)
    }

    async deleteManyByAnswerId(answerId: string): Promise<void> {
        this.items = this.items.filter((item) => item.answerId.toString() !== answerId)
    }
}
