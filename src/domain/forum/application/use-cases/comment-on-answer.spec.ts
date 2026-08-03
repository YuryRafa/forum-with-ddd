import {describe, expect, it} from 'vitest'
import { beforeEach } from 'vitest'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers-repository.js'
import { InMemoryAnswerCommentsRepository } from '../../../../../test/repositories/in-memory-answer-comments-repository.js'
import { CommentOnAnswer } from './comment-on-answer.js'
import { makeAnswer } from '../../../../../test/factories/make-answer.js'

let inMemoryAnswersRepository: InMemoryAnswersRepository 
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswer

describe('Comment on Answer', () => {

    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
        sut = new CommentOnAnswer(inMemoryAnswerCommentsRepository, inMemoryAnswersRepository)
    })

    it('Should be able to comment on a answer', async () => {   
        const answer = makeAnswer()

        await inMemoryAnswersRepository.create(answer)

        await sut.execute({
            answerId: answer.id.toString(),
            authorId: answer.authorId.toString(),
            content: 'Commenting'

        })

        expect(inMemoryAnswerCommentsRepository.items[0]?.content).toEqual('Commenting')
    
    })


}) 

