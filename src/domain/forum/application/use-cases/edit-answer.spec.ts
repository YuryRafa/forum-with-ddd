import {describe, expect, it} from 'vitest'
import { beforeEach } from 'vitest'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers-repository.js'
import { makeAnswer } from '../../../../../test/factories/make-answer.js'
import { EditAnswer } from './edit-answer.js'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js'
import { NotAllowedError } from './errors/not-allowed-error.js'

let inMemoryAnswersRepository: InMemoryAnswersRepository 
let sut: EditAnswer


describe('Edit answer', () => {

    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        sut = new EditAnswer(inMemoryAnswersRepository)
        
    })

    it('Should be able to get edit a answer by its id', async () => {
        const answer = makeAnswer({
            authorId: new UniqueEntityId('author-1'),
            questionId: new UniqueEntityId('question-1')
        }, new UniqueEntityId('answer-1'))

        await inMemoryAnswersRepository.create(answer)
        
        const result = await sut.execute({
            answerId: 'answer-1',
            authorId:'author-1',
            content: 'new content',
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryAnswersRepository.items[0]).toMatchObject({
            content: 'new content'
        })


    })

    it('Should not be able to edit a answer from another user', async () => {
        const answer = makeAnswer({
            authorId: new UniqueEntityId('author-1'),
            questionId: new UniqueEntityId('question-1')
        }, new UniqueEntityId('answer-1'))

        await inMemoryAnswersRepository.create(answer)
        
        const result = await sut.execute({
            answerId: 'answer-1',
            authorId:'author-2',
            content: 'new content',
        })

        expect(result.isLeft()).toBe(true)
        if (result.isLeft()) {
            expect(result.value).toBeInstanceOf(NotAllowedError)
        }


    })
}) 

