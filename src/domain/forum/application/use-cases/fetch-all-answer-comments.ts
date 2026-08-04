import type { PaginationParams } from '../../../../core/repositories/pagination-params.js'
import type { AnswerCommentsRepository } from '../repositories/answer-comments-repository.js'
import type { AnswersRepository } from '../repositories/answers-repository.js'
import type { AnswerComment } from '../../enterprise/entities/answer-comment.js'

interface FetchAnswerCommentsRequest {
  answerId: string
  page: PaginationParams
}

interface FetchAnswerCommentsResponse {
  answerComments: AnswerComment[]
}

export class FetchAnswerComments {
  constructor(
    private answerCommentsRepository: AnswerCommentsRepository,
    private answersRepository: AnswersRepository,
  ) {}

  async execute({ answerId, page }: FetchAnswerCommentsRequest): Promise<FetchAnswerCommentsResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    const answerComments = await this.answerCommentsRepository.findManyByAnswerId(answer.id.toString(), page)

    return { answerComments }
  }
}
