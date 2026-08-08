import { left, right, type Either } from "../../../../core/either.js";
import type { PaginationParams } from "../../../../core/repositories/pagination-params.js";
import type { Answer } from "../../enterprise/entities/answer.js";
import type { AnswersRepository } from "../repositories/answers-repository.js";
import type { QuestionsRepository } from "../repositories/questions-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";


interface ListAnswersFromQuestionRequest {
    questionId: string
    page: PaginationParams
}

type ListAnswersFromQuestionResponse = Either<
    ResourceNotFoundError,
    { answers: Answer[] }
>

export class ListAnswersFromQuestion {
    constructor(
        private answersRepository: AnswersRepository,
        private questionsRepository: QuestionsRepository
    ) {}

    async execute({ questionId, page}: ListAnswersFromQuestionRequest): Promise<ListAnswersFromQuestionResponse> {
        const question = await this.questionsRepository.findById(questionId)

        if (!question) {
            return left(new ResourceNotFoundError())
        }

        const answers = await this.answersRepository.FindManyByQuestionId(questionId, page)
        
        return right({
            answers
        })
    }
}