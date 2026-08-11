import {describe, expect, it} from 'vitest'
import { CreateQuestion } from '#/domain/forum/application/use-cases/create-question'
import { beforeEach } from 'vitest'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository.js'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository 
let sut: CreateQuestion

describe('Create Question', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new CreateQuestion(inMemoryQuestionsRepository)
        
    })

    it('Should be able to create an question', async () => {   
        const result = await sut.execute({
            authorId: '1',
            title: 'Question',
            content: 'questioning',
            attachmentIds: ['1', '2'],
        })

        expect(result.isRight()).toBe(true)

        if (result.isRight()) {
            const { question } = result.value

            expect(question.id).toBeTruthy()
            expect(inMemoryQuestionsRepository.items[0]?.id).toEqual(question.id)
            expect(question.content).toEqual('questioning')
            expect(inMemoryQuestionsRepository.items[0]?.attachments.currentItems).toEqual([
                expect.objectContaining({attachmentId: new UniqueEntityId('1')}),
                expect.objectContaining({attachmentId: new UniqueEntityId('2')}),

            ])
        }

        
    })

}) 

