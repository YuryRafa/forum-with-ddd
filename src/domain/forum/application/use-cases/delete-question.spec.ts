import {describe, expect, it} from 'vitest'
import { beforeEach } from 'vitest'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository.js'
import { makeQuestion } from '../../../../../test/factories/make-question.js'
import { DeleteQuestion } from './delete-question.js'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository 
let sut: DeleteQuestion


describe('Delete Question', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new DeleteQuestion(inMemoryQuestionsRepository)
        
    })

    it('Should be able to get delete a question by its id', async () => {
        const question = makeQuestion({
            authorId: new UniqueEntityId('author-1')
        }, new UniqueEntityId('question-1'))

        await inMemoryQuestionsRepository.create(question)
        
        await sut.execute({
            questionId: 'question-1',
            authorId:'author-1',
        })

        expect(inMemoryQuestionsRepository.items).toHaveLength(0)



    })

    it('Should not be able to delete a question from another user', async () => {
        const question = makeQuestion({
            authorId: new UniqueEntityId('author-1')
        }, new UniqueEntityId('question-1'))

        await inMemoryQuestionsRepository.create(question)
        
        await expect(() => sut.execute({
            questionId: 'question-1',
            authorId:'author-2',
        })).rejects.toBeInstanceOf(Error)


    })
}) 

