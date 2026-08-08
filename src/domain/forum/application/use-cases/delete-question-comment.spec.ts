import {describe, expect, it} from 'vitest'
import { beforeEach } from 'vitest'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository.js'
import { InMemoryQuestionCommentsRepository } from '../../../../../test/repositories/in-memory-question-comments-repository.js'
import { makeQuestion } from '../../../../../test/factories/make-question.js'
import { makeQuestionComment } from '../../../../../test/factories/make-question-comment.js'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js'
import { DeleteQuestionComment } from './delete-question-comment.js'
import { NotAllowedError } from './errors/not-allowed-error.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionComment

describe('Delete comment on question', () => {

    beforeEach(() => {
        inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new DeleteQuestionComment(inMemoryQuestionCommentsRepository)
    })

    it('Should be able to comment on a question', async () => {   
        const question = makeQuestion()

        await inMemoryQuestionsRepository.create(question)

        const questionComment = makeQuestionComment({
            authorId: new UniqueEntityId('author-1'),
            questionId: question.id
        })


        await inMemoryQuestionCommentsRepository.create(questionComment)

        const result = await sut.execute({
            authorId: questionComment.authorId.toString(), 
            questionCommentId: questionComment.id.toString()
        })


        expect(result.isRight()).toBe(true)
        expect(inMemoryQuestionCommentsRepository.items.length).toEqual(0)
   
    })

    it('Should not be able to delete another author comment', async () => {
        const question = makeQuestion()

        await inMemoryQuestionsRepository.create(question)

        const questionComment = makeQuestionComment({
            authorId: new UniqueEntityId('author-1'),
            questionId: question.id
        })


        await inMemoryQuestionCommentsRepository.create(questionComment)

        const result = await sut.execute({
            authorId: 'author-2', 
            questionCommentId: questionComment.id.toString()
        })

        expect(result.isLeft()).toBe(true)
        if (result.isLeft()) {
            expect(result.value).toBeInstanceOf(NotAllowedError)
        }
    
    })


}) 

