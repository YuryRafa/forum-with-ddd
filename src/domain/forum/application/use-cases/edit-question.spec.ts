import {describe, expect, it} from 'vitest'
import { beforeEach } from 'vitest'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository.js'
import { makeQuestion } from '../../../../../test/factories/make-question.js'
import { EditQuestion } from './edit-question.js'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js'
import { NotAllowedError } from './errors/not-allowed-error.js'
import { InMemoryQuestionAttachmentsRepository } from '../../../../../test/repositories/in-memory-question-attachments-repository.js'
import { makeQuestionAttachment } from '../../../../../test/factories/make-question-attachment.js'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository 
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: EditQuestion


describe('Edit Question', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
        sut = new EditQuestion(inMemoryQuestionsRepository, inMemoryQuestionAttachmentsRepository)
        
    })

    it('Should be able to get edit a question by its id', async () => {
        const question = makeQuestion({
            authorId: new UniqueEntityId('author-1')
        }, new UniqueEntityId('question-1'))

        await inMemoryQuestionsRepository.create(question)

        inMemoryQuestionAttachmentsRepository.items.push(makeQuestionAttachment({
                questionId: question.id,
                attachmentId: new UniqueEntityId('1')
            }),
            makeQuestionAttachment({
                questionId: question.id,
                attachmentId: new UniqueEntityId('2')
            }),
        )
        
        const result = await sut.execute({
            questionId: 'question-1',
            authorId:'author-1',
            content: 'new content',
            title: 'new title',
            attachmentsIds: ['1', '3']
        })

        expect(result.isRight()).toBe(true)

        if (result.isRight()) {
            const { question } = result.value

            expect(question.id).toBeTruthy()
            expect(inMemoryQuestionsRepository.items[0]?.id).toEqual(question.id)
            expect(question.content).toEqual('new content')
            expect(inMemoryQuestionsRepository.items[0]?.attachments.currentItems).toEqual([
                expect.objectContaining({attachmentId: new UniqueEntityId('1')}),
                expect.objectContaining({attachmentId: new UniqueEntityId('3')}),

            ])
        }

    })

    it('Should not be able to edit a question from another user', async () => {
        const question = makeQuestion({
            authorId: new UniqueEntityId('author-1')
        }, new UniqueEntityId('question-1'))

        await inMemoryQuestionsRepository.create(question)
        
        const result = await sut.execute({
            questionId: 'question-1',
            authorId:'author-2',
            content: 'new content',
            title: 'new title',
            attachmentsIds: []
        })

        expect(result.isLeft()).toBe(true)
        if (result.isLeft()) {
            expect(result.value).toBeInstanceOf(NotAllowedError)
        }


    })
}) 

