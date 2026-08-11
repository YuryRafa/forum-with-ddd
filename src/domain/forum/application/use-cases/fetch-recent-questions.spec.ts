import {describe, expect, it} from 'vitest'
import { beforeEach } from 'vitest'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository.js'
import { FetchRecentQuestions } from './fetch-recent-questions.js'
import { Question } from '../../enterprise/entities/question.js'
import { makeQuestion } from '../../../../../test/factories/make-question.js'
import { Slug } from '../../enterprise/entities/value-objects/slug.js'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository 
let sut: FetchRecentQuestions


describe('Fetch Recent Questions', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new FetchRecentQuestions(inMemoryQuestionsRepository)
        
    })

    it('Should be able to fetch recent questions', async () => {

        await inMemoryQuestionsRepository.create(makeQuestion({
            createdAt: new Date(2026, 0, 20)
        }))

        await inMemoryQuestionsRepository.create(makeQuestion({
            createdAt: new Date(2026, 0, 18)
            
        }))

        await inMemoryQuestionsRepository.create(makeQuestion({
            createdAt: new Date(2026, 0, 23)
        }))

        await inMemoryQuestionsRepository.create(makeQuestion({
            createdAt: new Date(2026, 0, 19)
        }))

        const result = await sut.execute({ page: 1 })

        expect(result.isRight()).toBe(true)

        if (result.isRight()) {
            const { questions } = result.value

            expect(questions).toEqual([
                expect.objectContaining({ createdAt: new Date(2026, 0, 23) }),
                expect.objectContaining({ createdAt: new Date(2026, 0, 20) }),
                expect.objectContaining({ createdAt: new Date(2026, 0, 19) }),
                expect.objectContaining({ createdAt: new Date(2026, 0, 18) })
            ])
            expect(questions).toHaveLength(4)
        }
    })

   it('Should be able to paginate the recent questions', async () => {
        const questions = []
        for (let i = 1; i <= 22; i++) {
            questions.push(makeQuestion({
                slug: Slug.createFromText(`example-question-${i}`)
            }))
        }

        questions.forEach(async (question: Question) => {
            await inMemoryQuestionsRepository.create(question)
        })

        const result = await sut.execute({ page: 2 })

        expect(result.isRight()).toBe(true)

        if (result.isRight()) {
            const { questions: recentQuestions } = result.value

            expect(recentQuestions).toHaveLength(2)
        }

    })


})



