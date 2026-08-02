import type { PaginationParams } from "../../../../core/repositories/pagination-params.js";
import type { Answer } from "../../enterprise/entities/answer.js";
import type { AnswersRepository } from "../repositories/answers-repository.js";


interface ListAnswersFromQuestionRequest {
    questionId: string
    page: PaginationParams
}

interface ListAnswersFromQuestionResponse {
    answers: Answer[]
}

export class ListAnswersFromQuestion {
    constructor(
        private answersRepository: AnswersRepository
    ) {}

    async execute({ questionId, page}: ListAnswersFromQuestionRequest): Promise<ListAnswersFromQuestionResponse> {
        const answers = await this.answersRepository.getAllAnswersById(questionId, page)

        if (!questionId){
            throw new Error("Question not found")
        }
        
        return {
            answers
        }
    }
}