import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.js"
import { QuestionComment } from "../../enterprise/entities/question-comment.js"
import type { QuestionsCommentsRepository } from "../repositories/question-comments-repository.js"
import type { QuestionsRepository } from "../repositories/questions-repository.js"

interface CommentOnQuestionRequest{
    authorId: string
    questionId: string
    content: string
}

interface CommentOnQuestionResponse{
    questionComment: QuestionComment
}


export class CommentOnQuestion{
    constructor(
        private questionCommentsRepository: QuestionsCommentsRepository, 
        private questionsRepository: QuestionsRepository)
        {}
    
    async execute({authorId,questionId,content}: CommentOnQuestionRequest): Promise<CommentOnQuestionResponse>{
        const question = await this.questionsRepository.findById(questionId)

        if (!question){
            throw new Error("Question not found")
        }

        const questionComment = QuestionComment.create({
            authorId: new UniqueEntityId(authorId), 
            questionId: new UniqueEntityId(questionId), 
            content
        })

        await this.questionCommentsRepository.create(questionComment)
        
        return {questionComment}

    }
}