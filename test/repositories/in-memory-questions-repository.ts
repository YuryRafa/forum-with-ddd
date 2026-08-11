import type { PaginationParams } from "../../src/core/repositories/pagination-params.js";
import type { QuestionAttachmentsRepository } from "../../src/domain/forum/application/repositories/question-attachments-repository.js";
import type { QuestionsRepository } from "../../src/domain/forum/application/repositories/questions-repository.js";
import type { Question } from "../../src/domain/forum/enterprise/entities/question.js";

export class InMemoryQuestionsRepository implements QuestionsRepository {
    public items: Question[] = []

    constructor(
        private questionAttachmentsRepository: QuestionAttachmentsRepository
    ) {}

    async create(question: Question): Promise<Question> {
        this.items.push(question)
        return question
    }

    async findBySlug(slug: string): Promise<Question | null> {
        const question = this.items.find(item => item.slug.value == slug)
        return question ?? null
    }

    async findById(questionId: string): Promise<Question | null> {
        const question = this.items.find(item => item.id.toString() == questionId)
        return question ?? null
    }
    
    async delete(question: Question): Promise<void> {
        const foundIndex = this.items.findIndex(item => item.id.toString() == question?.id.toString())
        if (foundIndex === -1) {
            return
        }
        this.items.splice(foundIndex, 1)
        this.questionAttachmentsRepository.deleteManyByQuestionId(question.id.toString())
    }

    async findManyRecent({page}: PaginationParams): Promise<Question[]> {
        const questions = this.items
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .slice((page - 1) * 20, page * 20)
        return questions
    }

    async save(question: Question): Promise<Question> {
        const foundIndex = this.items.findIndex(item => item.id.toString() == question?.id.toString())
        this.items[foundIndex] = question
        return question
    }
}