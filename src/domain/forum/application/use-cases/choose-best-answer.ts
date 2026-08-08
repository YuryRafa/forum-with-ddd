import { left, right, type Either } from "../../../../core/either.js";
import type { AnswersRepository } from "../repositories/answers-repository.js";
import type { Question } from "../../enterprise/entities/question.js";
import type { QuestionsRepository } from "../repositories/questions-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";
import { NotAllowedError } from "./errors/not-allowed-error.js";

interface ChooseBestAsnwerRequest {
    answerId: string
    authorId: string

}

type ChooseBestAsnwerResponse = Either<
    ResourceNotFoundError | NotAllowedError,
    { question: Question }
>

export class ChooseBestAnswer{

    constructor (
        private questionsRepository: QuestionsRepository,
        private answersRepository: AnswersRepository
    ) {}
    
    async execute({answerId, authorId}: ChooseBestAsnwerRequest):Promise<ChooseBestAsnwerResponse> {
        const answer = await this.answersRepository.findById(answerId)

        if(!answer){
            return left(new ResourceNotFoundError())
        }

        const question = await this.questionsRepository.findById(answer.questionId.toString())

        if (!question){
           return left(new ResourceNotFoundError())
        }

        if( authorId !== question.authorId.toString()){
            return left(new NotAllowedError())

        }

        question.bestAnswerId = answer.id
        
        await this.questionsRepository.save(question)
        
        return right({question})
    }
}

