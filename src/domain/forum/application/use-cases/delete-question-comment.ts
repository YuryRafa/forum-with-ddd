import { left, right, type Either } from "../../../../core/either.js"
import type { QuestionsCommentsRepository } from "../repositories/question-comments-repository.js"
import { NotAllowedError } from "./errors/not-allowed-error.js"
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js"

interface DeleteQuestionCommentRequest{
    authorId: string
    questionCommentId: string
}

type DeleteQuestionCommentResponse = Either<
    ResourceNotFoundError | NotAllowedError, 
    {}
>


export class DeleteQuestionComment{
    constructor(private questionCommentsRepository: QuestionsCommentsRepository){}
    
    async execute({authorId, questionCommentId}: DeleteQuestionCommentRequest): Promise<DeleteQuestionCommentResponse>{

        const questionComment = await this.questionCommentsRepository.findById(questionCommentId)


        if (!questionComment){
            return left(new ResourceNotFoundError())
        }

        if (authorId !== questionComment.authorId.toString()){
            return left(new NotAllowedError())

        }

        await this.questionCommentsRepository.delete(questionComment)
        
        return right({})

    }
}