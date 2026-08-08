import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers-repository.js'
import { makeAnswer } from '../../../../../test/factories/make-answer.js'
import { DeleteAnswer } from './delete-answer.js'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js'
import { NotAllowedError } from './errors/not-allowed-error.js'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswer

describe('Delete answer', () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        sut = new DeleteAnswer(inMemoryAnswersRepository)
    })

    it('Should be able to delete an answer by its id', async () => {
        const answer = makeAnswer({
            authorId: new UniqueEntityId('author-1'),
            questionId: new UniqueEntityId('question-1')
        }, new UniqueEntityId('answer-1'))

        await inMemoryAnswersRepository.create(answer)

        const result = await sut.execute({
            answerId: 'answer-1',
            authorId: 'author-1',
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryAnswersRepository.items).toHaveLength(0)
    })

    it('Should not be able to delete an answer from another user', async () => {
        const answer = makeAnswer({
            authorId: new UniqueEntityId('author-1'),
            questionId: new UniqueEntityId('question-1')
        }, new UniqueEntityId('answer-1'))

        await inMemoryAnswersRepository.create(answer)

        const result = await sut.execute({
            answerId: 'answer-1',
            authorId: 'author-2',
        })

        expect(result.isLeft()).toBe(true)
        if (result.isLeft()) {
            expect(result.value).toBeInstanceOf(NotAllowedError)
        }
    })
})
