import {describe, expect, it} from 'vitest'
import { beforeEach } from 'vitest'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository.js'
import { InMemoryQuestionCommentsRepository } from '../../../../../test/repositories/in-memory-question-comments-repository.js'
import { CommentOnQuestion } from './comment-on-question.js'
import { makeQuestion } from '../../../../../test/factories/make-question.js'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository 
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestion

describe('Comment on question', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
        sut = new CommentOnQuestion(inMemoryQuestionCommentsRepository, inMemoryQuestionsRepository)
    })

    it('Should be able to comment on a question', async () => {   
        const question = makeQuestion()

        await inMemoryQuestionsRepository.create(question)

        const result = await sut.execute({
            questionId: question.id.toString(),
            authorId: question.authorId.toString(),
            content: 'Commenting'

        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryQuestionCommentsRepository.items[0]?.content).toEqual('Commenting')
   
    })


}) 

