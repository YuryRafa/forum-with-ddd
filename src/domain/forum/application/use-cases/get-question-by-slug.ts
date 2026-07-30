import type { Question } from "#/domain/forum/enterprise/entities/question";
import type { QuestionsRepository } from "#/domain/forum/application/repositories/question-repository";

interface GetQuestionBySlugRequest {
    slug: string
}

interface GetQuestionBySlugResponse {
    question: Question
}

export class GetQuestionBySlug {
    constructor(
        private questionsRepository: QuestionsRepository
    ) {}

    async execute({ slug }: GetQuestionBySlugRequest): Promise<GetQuestionBySlugResponse> {
        const question = await this.questionsRepository.findBySlug(slug)
        if (!question) {
            throw new Error('Question not found')
        }

        return {
            question
        }
    }
}