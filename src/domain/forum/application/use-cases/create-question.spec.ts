import {describe, expect, it} from 'vitest'
import { CreateQuestion } from '#/domain/forum/application/use-cases/create-question'
import { beforeEach } from 'vitest'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository.js'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository 
let sut: CreateQuestion

describe('Create Question', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new CreateQuestion(inMemoryQuestionsRepository)
        
    })

    it('Should be able to create an question', async () => {   
    const {question} = await sut.execute({
        authorId: '1',
        title: 'Question',
        content: 'questioning',
    })

    expect(question.id).toBeTruthy()
    expect(inMemoryQuestionsRepository.items[0]?.id).toEqual(question.id)
    expect(question.content).toEqual('questioning')


    })

}) 

