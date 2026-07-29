import {expect, test} from 'vitest'
import { AnswerQuestion } from './answer-question.js'
import type { AnswersRepository } from '../repositories/answer-repository.js'
import type { Answer } from '../../enterprise/entities/answer.js'

const fakeAnswersRepository: AnswersRepository = {
    create: async (answer: Answer) => {
        return answer
    }
}

test('Create an answer', async () => {
    const answerQuestion = new AnswerQuestion(fakeAnswersRepository)

    const answer = await answerQuestion.execute({
        instructorId: '1',
        questionId: '1',
        content: "Answering",

    })

    expect(answer.content).toEqual("Answering")


})