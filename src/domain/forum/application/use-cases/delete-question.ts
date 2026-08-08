import { left, right, type Either } from "../../../../core/either.js";
import type { QuestionsRepository } from "../repositories/questions-repository.js";
import { NotAllowedError } from "./errors/not-allowed-error.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";

interface DeleteQuestionRequest {
    authorId: string,
    questionId: string

}

type DeleteQuestionResponse = Either<
    ResourceNotFoundError | NotAllowedError,
    {}
>

export class DeleteQuestion{

    constructor (
        private questionsRepository: QuestionsRepository
    ) {}
    
    async execute({authorId, questionId}: DeleteQuestionRequest): Promise<DeleteQuestionResponse> {
        const question = await this.questionsRepository.findById(questionId)

        if (!question){
            return left(new ResourceNotFoundError())
        }

        if (authorId !== question.authorId.toString()){
            return left(new NotAllowedError())
        }

        await this.questionsRepository.delete(question)
        
        return right({})
    }
}

