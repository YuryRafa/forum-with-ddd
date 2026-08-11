import { right, type Either } from "../../../../core/either.js";
import type { Question } from "#/domain/forum/enterprise/entities/question";
import type { QuestionsRepository } from "../repositories/questions-repository.js";

interface FetchRecentQuestionsRequest {
    page: number
}

type FetchRecentQuestionsResponse = Either<Error, { questions: Question[] }>

export class FetchRecentQuestions {
    constructor(
        private questionsRepository: QuestionsRepository
    ) {}

    async execute({ page }: FetchRecentQuestionsRequest): Promise<FetchRecentQuestionsResponse> {
        const questions = await this.questionsRepository.findManyRecent({page})
        
        return right({ questions })
    }
}