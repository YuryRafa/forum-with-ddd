import type { Question } from "#/domain/forum/enterprise/entities/question";
import type { QuestionsRepository } from "../repositories/questions-repository.js";

interface FetchRecentQuestionsRequest {
    page: number
}

interface FetchRecentQuestionsResponse {
    questions: Question[]
}

export class FetchRecentQuestions {
    constructor(
        private questionsRepository: QuestionsRepository
    ) {}

    async execute({ page }: FetchRecentQuestionsRequest): Promise<FetchRecentQuestionsResponse> {
        const questions = await this.questionsRepository.findManyRecent({page})
        
        return {
            questions
        }
    }
}