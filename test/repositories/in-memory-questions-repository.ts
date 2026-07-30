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

    async findByid(questionId: string): Promise<Question | null> {
        const question = this.items.find(item => item.id.toString() == questionId)
        return question ?? null
    }
    
    async delete(question: Question): Promise<void> {
        const foundIndex = this.items.findIndex(item => item.id.toString() == question?.id.toString())
        if (foundIndex === -1) {
            return
        }
        this.items.splice(foundIndex, 1)

        
    }
}