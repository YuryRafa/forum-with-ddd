import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers-repository.js'
import { makeAnswer } from '../../../../../test/factories/make-answer.js'
import { ChooseBestAnswer } from './choose-best-answer.js'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository.js'
import { makeQuestion } from '../../../../../test/factories/make-question.js'
import { NotAllowedError } from './errors/not-allowed-error.js'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: ChooseBestAnswer

describe('Delete answer', () => {
    beforeEach(() => {
        const inMemoryAnswerAttachmentsRepository = { items: [], findManyByAnswerId: async () => [], deleteManyByAnswerId: async () => {} }
        inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository)
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new ChooseBestAnswer(inMemoryQuestionsRepository, inMemoryAnswersRepository)
    })

    it('Should be able to choose the question best answer', async () => {
        
        const question = makeQuestion()

        await inMemoryQuestionsRepository.create(question)

        const answer = makeAnswer({
            questionId: question.id
        })

        await inMemoryAnswersRepository.create(answer)

        const result = await sut.execute({
            answerId: answer.id.toString(),
            authorId: question.authorId.toString(),
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryQuestionsRepository.items[0]?.bestAnswerId.toString()).toEqual(answer.id.toString())

        
    })

    it('Should not be able to choose another user question best answer', async () => {
        const question = makeQuestion()

        await inMemoryQuestionsRepository.create(question)

        const answer = makeAnswer({
            questionId: question.id
        })

        await inMemoryAnswersRepository.create(answer)

        const result = await sut.execute({
            answerId: answer.id.toString(),
            authorId: 'author-2',
        })

        expect(result.isLeft()).toBe(true)
        if (result.isLeft()) {
            expect(result.value).toBeInstanceOf(NotAllowedError)
        }
    })
})
