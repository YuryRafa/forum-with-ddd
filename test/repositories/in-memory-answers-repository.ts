import type { PaginationParams } from "../../src/core/repositories/pagination-params.js";
import type { AnswersRepository } from "../../src/domain/forum/application/repositories/answers-repository.js";
import type { Answer } from "../../src/domain/forum/enterprise/entities/answer.js";


export class InMemoryAnswersRepository implements AnswersRepository {

    public items: Answer[] = []

    async create(answer: Answer): Promise<Answer> {
        this.items.push(answer)
        return answer
    }

    async findById(answerId: string): Promise<Answer | null> {
        const answer = this.items.find(item => item.id.toString() == answerId)
        return answer ?? null
    }

    async FindManyByQuestionId(questionId: string, {page}: PaginationParams): Promise<Answer[]> {
        const questions = this.items
            .filter((item) => item.questionId.toString() === questionId)
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .slice((page - 1) * 20, page * 20)
        return questions
    }
    
    async save(answer: Answer): Promise<Answer> {
        const foundIndex = this.items.findIndex(item => item.id.toString() == answer?.id.toString())
        this.items[foundIndex] = answer
        return answer
    }

    async delete(answer: Answer): Promise<void> {
        const foundIndex = this.items.findIndex(item => item.id.toString() == answer?.id.toString())
        if (foundIndex === -1) {
            return
        }
        this.items.splice(foundIndex, 1)
    }
}