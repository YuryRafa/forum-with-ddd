import {describe, expect, it} from 'vitest'
import { beforeEach } from 'vitest'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository.js'
import { GetQuestionBySlug } from './get-question-by-slug.js'
import { Question } from '../../enterprise/entities/question.js'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js'
import { makeQuestion } from '../../../../../test/factories/make-question.js'
import { Slug } from '../../enterprise/entities/value-objects/slug.js'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository 
let sut: GetQuestionBySlug


describe('Find Question', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new GetQuestionBySlug(inMemoryQuestionsRepository)
        
    })

    it('Should be able to get a question by slug', async () => {
        const question = makeQuestion({
            slug: Slug.createFromText('example-question')
        })

        
        await inMemoryQuestionsRepository.create(question)
        

        const foundQuestion = await sut.execute({ slug: question.slug.value })

        expect(foundQuestion.question.id).toBeTruthy()
        expect(foundQuestion.question.content).toEqual(question.content)


        })

    it('Should be able to throw and error when getting a question by the wrong slug', async () => {
        const question = Question.create({
            authorId: new UniqueEntityId(),
            content: 'questioning',
            title: 'Question'
        })

        await inMemoryQuestionsRepository.create(question)


        await expect(() => sut.execute({ slug: 'error' })).rejects.toThrow(Error)


        })

}) 

