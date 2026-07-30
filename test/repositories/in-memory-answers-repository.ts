import type { AnswersRepository } from "../../src/domain/forum/application/repositories/answer-repository.js";
import type { Answer } from "../../src/domain/forum/enterprise/entities/answer.js";

export class InMemoryAnswersRepository implements AnswersRepository {
    
    public items: Answer[] = []

    async create(answer: Answer): Promise<Answer> {
        this.items.push(answer)
        return answer
    }
    
}