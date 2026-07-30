import { Question } from "#/domain/forum/enterprise/entities/question"

export interface QuestionsRepository {
    create(question: Question):Promise<Question>
    findBySlug(slug: string):Promise<Question | null>
    findByid(questionId: string):Promise<Question | null>
    save(question: Question):Promise<Question>
    delete(question: Question): Promise<void>
}