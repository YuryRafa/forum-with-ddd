import {describe, expect, it} from 'vitest'
import { beforeEach } from 'vitest'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers-repository.js'
import { Question } from '../../enterprise/entities/question.js'
import { makeQuestion } from '../../../../../test/factories/make-question.js'
import { Slug } from '../../enterprise/entities/value-objects/slug.js'
import { ListAnswersFromQuestion } from './list-answers-from-question.js'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository.js'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js'
import { makeAnswer } from '../../../../../test/factories/make-answer.js'
import type { Answer } from '../../enterprise/entities/answer.js'

let inMemoryAnswersRepository: InMemoryAnswersRepository 
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: ListAnswersFromQuestion


describe('Fetch Recent Answers', () => {

    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new ListAnswersFromQuestion(inMemoryAnswersRepository)
        
    })

    it('Should be able to list answers for a question', async () => {

        const question = await inMemoryQuestionsRepository.create(makeQuestion({}, new UniqueEntityId("question-1")))

        await inMemoryAnswersRepository.create(makeAnswer({questionId: question.id}))
        await inMemoryAnswersRepository.create(makeAnswer({questionId: question.id}))
        await inMemoryAnswersRepository.create(makeAnswer({questionId: question.id}))

        const {answers} = await sut.execute({questionId: question.id.toString(), page: { page: 1}})

        expect(answers.length).toEqual(3)
        expect(answers).toEqual([
            expect.objectContaining({questionId: question.id}),
            expect.objectContaining({questionId: question.id}),
            expect.objectContaining({questionId: question.id})
        ])
    })
    it('Should be able to list PAGINATED answers for a question', async () => {
        
        const question = await inMemoryQuestionsRepository.create(makeQuestion({}, new UniqueEntityId("question-1")))

        const answers = []
        for (let i = 1; i <= 22; i++) {
            answers.push(makeAnswer({
                questionId: question.id
            }))
        }

        answers.forEach(async (answer: Answer) => {
            await inMemoryAnswersRepository.create(answer)
        })

        const {answers: newAnswers} = await sut.execute({questionId: question.id.toString(), page: { page: 2}})

        expect(newAnswers.length).toEqual(2)
        expect(newAnswers).toEqual([
            expect.objectContaining({questionId: question.id}),
            expect.objectContaining({questionId: question.id})
        ])



    })




})


