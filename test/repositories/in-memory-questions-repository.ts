import type { QuestionsRepository } from "../../src/domain/forum/application/repositories/question-repository.js";
import type { Question } from "../../src/domain/forum/enterprise/entities/question.js";

export class InMemoryQuestionsRepository implements QuestionsRepository {
    public items: Question[] = []

    async create(question: Question): Promise<Question> {
        this.items.push(question)
        return question
    }

    async findBySlug(slug: string): Promise<Question | null> {
        const question = this.items.find(item => item.slug.value == slug)
        return question ?? null
    }
}