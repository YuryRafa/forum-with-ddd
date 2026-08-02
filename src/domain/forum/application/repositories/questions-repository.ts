import { Question } from "#/domain/forum/enterprise/entities/question"
import type { PaginationParams } from "../../../../core/repositories/pagination-params.js"

export interface QuestionsRepository {
    create(question: Question):Promise<Question>
    findBySlug(slug: string):Promise<Question | null>
    findById(questionId: string):Promise<Question | null>
    findManyRecent({page}: PaginationParams):Promise<Question[]>
    save(question: Question):Promise<Question>
    delete(question: Question): Promise<void>
}