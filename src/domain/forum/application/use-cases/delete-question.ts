import type { QuestionsRepository } from "#/domain/forum/application/repositories/question-repository";

interface DeleteQuestionRequest {
    authorId: string,
    questionId: string

}

interface DeleteQuestionResponse{}

export class DeleteQuestion{

    constructor (
        private questionsRepository: QuestionsRepository
    ) {}
    
    async execute({authorId, questionId}: DeleteQuestionRequest): Promise<DeleteQuestionResponse> {
        const question = await this.questionsRepository.findById(questionId)

        if (!question){
            throw new Error('Question not found')
        }

        if (authorId !== question.authorId.toString()){
            throw new Error("You're not allowed to delete that question ")
        }

        await this.questionsRepository.delete(question)
        
        return {}
    }
}

