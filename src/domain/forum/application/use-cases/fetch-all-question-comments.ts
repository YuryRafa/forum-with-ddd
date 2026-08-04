import { QuestionComment } from "../../enterprise/entities/question-comment.js"
import type { PaginationParams } from "../../../../core/repositories/pagination-params.js"
import type { QuestionsCommentsRepository } from "../repositories/question-comments-repository.js"
import type { QuestionsRepository } from "../repositories/questions-repository.js"

interface FetchQuestionCommentsRequest{
    questionId: string
    page: PaginationParams
}

interface FetchQuestionCommentsResponse{
    questionComments: QuestionComment[]
}


export class FetchQuestionComments{
    constructor(
        private questionCommentsRepository: QuestionsCommentsRepository, 
        private questionsRepository: QuestionsRepository)
        {}
    
    async execute({questionId, page}: FetchQuestionCommentsRequest): Promise<FetchQuestionCommentsResponse>{
        const question = await this.questionsRepository.findById(questionId)

        if (!question){
            throw new Error("Question not found")
        }


        const questionComments = await this.questionCommentsRepository.findManyByQuestionId(question.id.toString(), page)
        
        return {questionComments}

    }
}