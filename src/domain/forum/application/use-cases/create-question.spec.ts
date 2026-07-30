import {describe, expect, it} from 'vitest'
import { CreateQuestion } from '#/domain/forum/application/use-cases/create-question'
import { beforeEach } from 'vitest'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository.js'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository 
let createQuestion: CreateQuestion

describe('Create Question', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        createQuestion = new CreateQuestion(inMemoryQuestionsRepository)
        
    })

    it('Should be able to create an question', async () => {   
    const {question} = await createQuestion.execute({
        authorId: '1',
        title: 'Question',
        content: 'questioning',
    })

    expect(question.id).toBeTruthy()
    expect(question.content).toEqual('questioning')


    })

}) 

