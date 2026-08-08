import { left, right, type Either } from "../../../../core/either.js";
import type { Question } from "#/domain/forum/enterprise/entities/question";
import type { QuestionsRepository } from "../repositories/questions-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";

interface GetQuestionBySlugRequest {
    slug: string
}

type GetQuestionBySlugResponse = Either<
    ResourceNotFoundError,
    { question: Question }
>

export class GetQuestionBySlug {
    constructor(
        private questionsRepository: QuestionsRepository
    ) {}

    async execute({ slug }: GetQuestionBySlugRequest): Promise<GetQuestionBySlugResponse> {
        const question = await this.questionsRepository.findBySlug(slug)
        if (!question) {
            return left(new ResourceNotFoundError())
        }

        return right({
            question
        })
    }
}