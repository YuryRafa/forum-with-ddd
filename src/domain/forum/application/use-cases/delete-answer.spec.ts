import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers-repository.js'
import { makeAnswer } from '../../../../../test/factories/make-answer.js'
import { DeleteAnswer } from './delete-answer.js'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js'

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

        await sut.execute({
            answerId: 'answer-1',
            authorId: 'author-1',
        })

        expect(inMemoryAnswersRepository.items).toHaveLength(0)
    })

    it('Should not be able to delete an answer from another user', async () => {
        const answer = makeAnswer({
            authorId: new UniqueEntityId('author-1'),
            questionId: new UniqueEntityId('question-1')
        }, new UniqueEntityId('answer-1'))

        await inMemoryAnswersRepository.create(answer)

        await expect(() => sut.execute({
            answerId: 'answer-1',
            authorId: 'author-2',
        })).rejects.toBeInstanceOf(Error)
    })
})
