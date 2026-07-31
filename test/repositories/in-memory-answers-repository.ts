import type { AnswersRepository } from "../../src/domain/forum/application/repositories/answer-repository.js";
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