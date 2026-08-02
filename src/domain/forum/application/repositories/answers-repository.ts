import type { Answer } from "#/domain/forum/enterprise/entities/answer";
import type { PaginationParams } from "../../../../core/repositories/pagination-params.js";

export interface AnswersRepository {
    create(answer: Answer): Promise<Answer>
    findById(answerId: string): Promise<Answer | null>
    getAllAnswersById(questionId: string, {page}: PaginationParams):Promise<Answer[]>
    save(answer: Answer): Promise<Answer>
    delete(answer: Answer): Promise<void>
    
}