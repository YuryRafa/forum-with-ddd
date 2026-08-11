import {describe, expect, it} from 'vitest'
import { beforeEach } from 'vitest'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository.js'
import { makeQuestion } from '../../../../../test/factories/make-question.js'
import { DeleteQuestion } from './delete-question.js'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js'
import { NotAllowedError } from './errors/not-allowed-error.js'
import { InMemoryQuestionAttachmentsRepository } from '../../../../../test/repositories/in-memory-question-attachments-repository.js'
import { makeQuestionAttachment } from '../../../../../test/factories/make-question-attachment.js'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository 
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: DeleteQuestion


describe('Delete Question', () => {

    beforeEach(() => {
        inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository)
        sut = new DeleteQuestion(inMemoryQuestionsRepository)
        
    })

    it('Should be able to get delete a question by its id', async () => {
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
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryQuestionsRepository.items).toHaveLength(0)



    })

    it('Should not be able to delete a question from another user', async () => {
        const question = makeQuestion({
            authorId: new UniqueEntityId('author-1')
        }, new UniqueEntityId('question-1'))

        await inMemoryQuestionsRepository.create(question)
        
        const result = await sut.execute({
            questionId: 'question-1',
            authorId:'author-2',
        })

        expect(result.isLeft()).toBe(true)
        if (result.isLeft()) {
            expect(result.value).toBeInstanceOf(NotAllowedError)
        }


    })
}) 

