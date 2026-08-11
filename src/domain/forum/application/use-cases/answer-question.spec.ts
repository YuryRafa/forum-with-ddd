import {describe, expect, it} from 'vitest'
import { AnswerQuestion } from '#/domain/forum/application/use-cases/answer-question'
import { beforeEach } from 'vitest'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers-repository.js'

let inMemoryAnswersRepository: InMemoryAnswersRepository 
let sut: AnswerQuestion

describe('answer Question', () => {

    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        sut = new AnswerQuestion(inMemoryAnswersRepository)
        
    })

    it('Should be able to answer a question', async () => {   
        const result = await sut.execute({
                instructorId: '1',
                questionId: '1',
                content: 'answering',
        })

        expect(result.isRight()).toBe(true)

        if (result.isRight()) {
            const { answer } = result.value

            expect(answer.id).toBeTruthy()
            expect(inMemoryAnswersRepository.items[0]?.id).toEqual(answer.id)
            expect(answer.content).toEqual('answering')
        }
    })

}) 

