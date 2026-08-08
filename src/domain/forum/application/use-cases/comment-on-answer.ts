import { left, right, type Either } from "../../../../core/either.js"
import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.js"
import { AnswerComment } from "../../enterprise/entities/answer-comment.js"
import type { AnswerCommentsRepository } from "../repositories/answer-comments-repository.js"
import type { AnswersRepository } from "../repositories/answers-repository.js"
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js"

interface CommentOnAnswerRequest{
    authorId: string
    answerId: string
    content: string
}

type CommentOnAnswerResponse = Either<
    ResourceNotFoundError,
    { answerComment: AnswerComment }
>


export class CommentOnAnswer{
    constructor(
        private answerCommentsRepository: AnswerCommentsRepository, 
        private answerRepository: AnswersRepository)
        {}
    
    async execute({authorId,answerId,content}: CommentOnAnswerRequest): Promise<CommentOnAnswerResponse>{
        const answer = await this.answerRepository.findById(answerId)

        if (!answer){
            return left(new ResourceNotFoundError())
        }

        const answerComment = AnswerComment.create({
            authorId: new UniqueEntityId(authorId), 
            answerId: new UniqueEntityId(answerId), 
            content
        })

        await this.answerCommentsRepository.create(answerComment)
        
        return right({answerComment})

    }
}