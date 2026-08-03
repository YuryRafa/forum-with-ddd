import {describe, expect, it} from 'vitest'
import { beforeEach } from 'vitest'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository.js'
import { makeQuestion } from '../../../../../test/factories/make-question.js'
import { EditQuestion } from './edit-question.js'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository 
let sut: EditQuestion


describe('Edit Question', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new EditQuestion(inMemoryQuestionsRepository)
        
    })

    it('Should be able to get edit a question by its id', async () => {
        const question = makeQuestion({
            authorId: new UniqueEntityId('author-1')
        }, new UniqueEntityId('question-1'))

        await inMemoryQuestionsRepository.create(question)
        
        await sut.execute({
            questionId: 'question-1',
            authorId:'author-1',
            content: 'new content',
            title: 'new title'
        })

        expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
            title: 'new title',
            content: 'new content'
        })


    })

    it('Should not be able to edit a question from another user', async () => {
        const question = makeQuestion({
            authorId: new UniqueEntityId('author-1')
        }, new UniqueEntityId('question-1'))

        await inMemoryQuestionsRepository.create(question)
        
        await expect(() => sut.execute({
            questionId: 'question-1',
            authorId:'author-2',
            content: 'new content',
            title: 'new title'
        })).rejects.toBeInstanceOf(Error)


    })
}) 

