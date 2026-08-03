import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.js"
import { QuestionComment } from "../../enterprise/entities/question-comment.js"
import type { QuestionsCommentsRepository } from "../repositories/question-comments-repository.js"
import type { QuestionsRepository } from "../repositories/questions-repository.js"

interface DeleteQuestionCommentRequest{
    authorId: string
    questionCommentId: string
}

interface DeleteQuestionCommentResponse{}


export class DeleteQuestionComment{
    constructor(private questionCommentsRepository: QuestionsCommentsRepository){}
    
    async execute({authorId, questionCommentId}: DeleteQuestionCommentRequest): Promise<DeleteQuestionCommentResponse>{

        const questionComment = await this.questionCommentsRepository.findById(questionCommentId)


        if (!questionComment){
            throw new Error("Comment not found")
        }

        if (authorId !== questionComment.authorId.toString()){
            throw new Error("No allowed")

        }

        await this.questionCommentsRepository.delete(questionComment)
        
        return {}

    }
}