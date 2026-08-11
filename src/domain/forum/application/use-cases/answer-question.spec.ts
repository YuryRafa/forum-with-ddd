import {describe, expect, it} from 'vitest'
import { AnswerQuestion } from '#/domain/forum/application/use-cases/answer-question'
import { beforeEach } from 'vitest'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers-repository.js'
import { InMemoryAnswerAttachmentsRepository } from '../../../../../test/repositories/in-memory-answer-attachments-repository.js'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js'

let inMemoryAnswersRepository: InMemoryAnswersRepository 
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let sut: AnswerQuestion

describe('answer Question', () => {

    beforeEach(() => {
        inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
        inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository)
        sut = new AnswerQuestion(inMemoryAnswersRepository)
        
    })

    it('Should be able to answer a question', async () => {   
        const result = await sut.execute({
                instructorId: '1',
                questionId: '1',
                content: 'answering',
                attachmentIds: ['1', '2'],
        })

        expect(result.isRight()).toBe(true)

        if (result.isRight()) {
            const { answer } = result.value

            expect(answer.id).toBeTruthy()
            expect(inMemoryAnswersRepository.items[0]?.id).toEqual(answer.id)
            expect(answer.content).toEqual('answering')
            expect(inMemoryAnswersRepository.items[0]?.attachments.currentItems).toEqual([
                expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
                expect.objectContaining({ attachmentId: new UniqueEntityId('2') }),
            ])
        }
    })

}) 

