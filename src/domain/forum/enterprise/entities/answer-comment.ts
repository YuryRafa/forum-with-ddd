
import type { UniqueEntityId } from "../../../../core/entities/unique-entity-id.js";
import type { Optional } from "../../../../core/types/optional.js";
import { Comment, type CommentProps } from "./comment.js";

export interface AnswerCommentProps extends CommentProps {
    answerId: UniqueEntityId
}

export class AnswerComment extends Comment<AnswerCommentProps> {

    static create(
        props: Optional<AnswerCommentProps, 'createdAt'>, 
        id?: UniqueEntityId) {
        const answerComment = new AnswerComment({
            ...props,
            createdAt: new Date(),
        }, id)

        return answerComment
    }
}