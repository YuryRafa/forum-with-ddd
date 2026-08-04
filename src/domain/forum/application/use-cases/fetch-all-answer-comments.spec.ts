import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers-repository.js'
import { InMemoryAnswerCommentsRepository } from '../../../../../test/repositories/in-memory-answer-comments-repository.js'
import { makeAnswer } from '../../../../../test/factories/make-answer.js'
import { makeAnswerComment } from '../../../../../test/factories/make-answer-comment.js'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js'
import { FetchAnswerComments } from './fetch-all-answer-comments.js'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerComments

describe('Fetch all answer comments', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswerComments(inMemoryAnswerCommentsRepository, inMemoryAnswersRepository)
  })

  it('should be able to fetch all comments from an answer', async () => {
    const answer = makeAnswer()
    const comments = []

    await inMemoryAnswersRepository.create(answer)

    for (let i = 0; i < 10; i++) {
      comments.push(
        makeAnswerComment(
          {
            answerId: answer.id,
          },
          new UniqueEntityId(`comment-${i}`),
        ),
      )
    }

    for (const comment of comments) {
      await inMemoryAnswerCommentsRepository.create(comment)
    }

    const result = await sut.execute({ answerId: answer.id.toString(), page: { page: 1 } })

    expect(result.answerComments).toHaveLength(10)
  })

  it('should be able to paginate answer comments', async () => {
    const answer = makeAnswer()

    await inMemoryAnswersRepository.create(answer)

    const comments = []

    for (let i = 0; i < 25; i++) {
      const comment = makeAnswerComment(
        {
          answerId: answer.id,
          createdAt: new Date(2024, 0, 1 + i),
        },
        new UniqueEntityId(`comment-${i}`),
      )
      await inMemoryAnswerCommentsRepository.create(comment)
      comments.push(comment)
    }

    const firstPageResult = await sut.execute({ answerId: answer.id.toString(), page: { page: 1 } })
    const secondPageResult = await sut.execute({ answerId: answer.id.toString(), page: { page: 2 } })

    const firstPageIds = firstPageResult.answerComments.map((comment) => comment.id.toString())
    const secondPageIds = secondPageResult.answerComments.map((comment) => comment.id.toString())

    expect(firstPageResult.answerComments).toHaveLength(20)
    expect(secondPageResult.answerComments).toHaveLength(5)
    expect(firstPageIds.some((id) => secondPageIds.includes(id))).toBe(false)
    expect(firstPageIds).toHaveLength(20)
    expect(secondPageIds).toHaveLength(5)
  })
})
