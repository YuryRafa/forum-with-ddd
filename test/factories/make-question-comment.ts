import { UniqueEntityId } from '#/core/entities/unique-entity-id'
import { QuestionComment, type QuestionCommentProps } from "#/domain/forum/enterprise/entities/question-comment";
import {faker} from '@faker-js/faker'

// the override Partial turn all properties of QuestionCommentProps to optional
export function makeQuestionComment(
    override: Partial<QuestionCommentProps> = {},
    id?: UniqueEntityId
) { 

    const questioncomment = QuestionComment.create({
        authorId: new UniqueEntityId(),
        questionId: new UniqueEntityId(),
        content: faker.lorem.text(),
        ...override

    }, id,)

    return questioncomment

}