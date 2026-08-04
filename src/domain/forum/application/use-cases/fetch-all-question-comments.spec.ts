import {describe, expect, it} from 'vitest'
import { beforeEach } from 'vitest'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository.js'
import { InMemoryQuestionCommentsRepository } from '../../../../../test/repositories/in-memory-question-comments-repository.js'
import { makeQuestion } from '../../../../../test/factories/make-question.js'
import { makeQuestionComment } from '../../../../../test/factories/make-question-comment.js'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js'
import { FetchQuestionComments } from './fetch-all-question-comments.js'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository 
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionComments

describe('Fetch all question comments', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
        sut = new FetchQuestionComments(inMemoryQuestionCommentsRepository, inMemoryQuestionsRepository)
    })

    it('should be able to fetch all comments from a question', async () => {   
        const question = makeQuestion()
        const comments = []

        await inMemoryQuestionsRepository.create(question)

        for (let i = 0; i < 10; i++) {
            comments.push(makeQuestionComment({
                questionId: question.id
            }, new UniqueEntityId(`comment-${i}`)))
        }

        for (const comment of comments) {
            await inMemoryQuestionCommentsRepository.create(comment)
        }

        const result = await sut.execute({questionId: question.id.toString(), page: { page: 1 }})

        expect(result.questionComments).toHaveLength(10)
    })

    it('should be able to paginate question comments', async () => {
        const question = makeQuestion()

        await inMemoryQuestionsRepository.create(question)

        const comments = []

        for (let i = 0; i < 25; i++) {
            const comment = makeQuestionComment({
                questionId: question.id,
                createdAt: new Date(2024, 0, 1 + i),
            }, new UniqueEntityId(`comment-${i}`))
            await inMemoryQuestionCommentsRepository.create(comment)
            comments.push(comment)
        }

        const firstPageResult = await sut.execute({ questionId: question.id.toString(), page: { page: 1 } })
        const secondPageResult = await sut.execute({ questionId: question.id.toString(), page: { page: 2 } })

        const firstPageIds = firstPageResult.questionComments.map((comment) => comment.id.toString())
        const secondPageIds = secondPageResult.questionComments.map((comment) => comment.id.toString())

        expect(firstPageResult.questionComments).toHaveLength(20)
        expect(secondPageResult.questionComments).toHaveLength(5)
        expect(firstPageIds.some((id) => secondPageIds.includes(id))).toBe(false)
        expect(firstPageIds).toHaveLength(20)
        expect(secondPageIds).toHaveLength(5)
    })
})

