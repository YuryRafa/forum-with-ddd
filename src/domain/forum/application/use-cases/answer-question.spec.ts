import {expect, test} from 'vitest'
import { AnswerQuestion } from '#/domain/forum/application/use-cases/answer-question'
import type { AnswersRepository } from '#/domain/forum/application/repositories/answer-repository'
import type { Answer } from '#/domain/forum/enterprise/entities/answer'

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