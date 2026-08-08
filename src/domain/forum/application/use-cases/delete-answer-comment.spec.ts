import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers-repository.js'
import { InMemoryAnswerCommentsRepository } from '../../../../../test/repositories/in-memory-answer-comments-repository.js'
import { makeAnswer } from '../../../../../test/factories/make-answer.js'
import { makeAnswerComment } from '../../../../../test/factories/make-answer-comment.js'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js'
import { DeleteAnswerComment } from './delete-answer-comment.js'
import { CommentNotFoundError } from './errors/comment-not-found-error.js'
import { NotAllowedError } from './errors/not-allowed-error.js'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerComment

describe('Delete comment on answer', () => {
    beforeEach(() => {
        inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        sut = new DeleteAnswerComment(inMemoryAnswerCommentsRepository)
    })

    it('should be able to delete a comment on an answer', async () => {
        const answer = makeAnswer()
        await inMemoryAnswersRepository.create(answer)

        const answerComment = makeAnswerComment({
            authorId: new UniqueEntityId('author-1'),
            answerId: answer.id
        })

        await inMemoryAnswerCommentsRepository.create(answerComment)

        const result = await sut.execute({
            authorId: answerComment.authorId.toString(),
            answerCommentId: answerComment.id.toString()
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryAnswerCommentsRepository.items.length).toEqual(0)
    })

    it('should not be able to delete another author comment', async () => {
        const answer = makeAnswer()
        await inMemoryAnswersRepository.create(answer)

        const answerComment = makeAnswerComment({
            authorId: new UniqueEntityId('author-1'),
            answerId: answer.id
        })

        await inMemoryAnswerCommentsRepository.create(answerComment)

        const result = await sut.execute({
            authorId: 'author-2',
            answerCommentId: answerComment.id.toString()
        })

        expect(result.isLeft()).toBe(true)
        if (result.isLeft()) {
            expect(result.value).toBeInstanceOf(NotAllowedError)
        }
    })
})
