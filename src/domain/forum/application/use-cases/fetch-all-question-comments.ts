import { left, right, type Either } from "../../../../core/either.js"
import { QuestionComment } from "../../enterprise/entities/question-comment.js"
import type { PaginationParams } from "../../../../core/repositories/pagination-params.js"
import type { QuestionsCommentsRepository } from "../repositories/question-comments-repository.js"
import type { QuestionsRepository } from "../repositories/questions-repository.js"
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js"

interface FetchQuestionCommentsRequest{
    questionId: string
    page: PaginationParams
}

type FetchQuestionCommentsResponse = Either<
    ResourceNotFoundError,
    { questionComments: QuestionComment[] }
>


export class FetchQuestionComments{
    constructor(
        private questionCommentsRepository: QuestionsCommentsRepository, 
        private questionsRepository: QuestionsRepository)
        {}
    
    async execute({questionId, page}: FetchQuestionCommentsRequest): Promise<FetchQuestionCommentsResponse>{
        const question = await this.questionsRepository.findById(questionId)

        if (!question){
            return left(new ResourceNotFoundError())
        }


        const questionComments = await this.questionCommentsRepository.findManyByQuestionId(question.id.toString(), page)
        
        return right({questionComments})

    }
}