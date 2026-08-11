import { Slug } from "#/domain/forum/enterprise/entities/value-objects/slug"
import type { UniqueEntityId } from "#/core/entities/unique-entity-id"
import type { Optional } from "#/core/types/optional"
import dayjs from "dayjs"
import { AggregateRoot } from "../../../../core/entities/aggregate-root.js"
import type { QuestionAttachment } from "./answer-attachment.js"
import { QuestionAttachmentList } from "./question-attatchment-list.js"

export interface QuestionProps {
    authorId: UniqueEntityId
    title: string
    content: string
    bestAnswerId?: UniqueEntityId
    attachments: QuestionAttachmentList
    slug: Slug
    createdAt: Date
    updatedAt?: Date

}

export class Question extends AggregateRoot<QuestionProps>{
    get authorId() {
        return this.props.authorId
    }

    get title() {
        return this.props.title
    }
    
    get content() {
        return this.props.content
    }

    get bestAnswerId() {
        return this.props.bestAnswerId!
    }

    get attachments(){
        return this.props.attachments
    }

    get slug() {
        return this.props.slug
    }
    
    get createdAt() {
        return this.props.createdAt
    }
    
    get updatedAt() {
        return this.props.updatedAt
    }

    get isNew(): boolean {
        return dayjs().diff(this.createdAt, 'days') <= 3
    }

    get excerpt() {
        return this.content.substring(0, 120).trimEnd().concat('...')
    }



    private touch() {
        this.props.updatedAt = new Date()
    }

    set content(content: string) {
        this.props.content = content
        this.touch()
    }

    set title(title: string) {
        this.props.title = title
        this.props.slug = Slug.createFromText(title)
        this.touch()
    }

    set bestAnswerId(bestAnswerId: UniqueEntityId){
        this.props.bestAnswerId = bestAnswerId
        this.touch()

    }

    set attachments(attachments: QuestionAttachmentList){
        this.props.attachments = attachments
    }

    static create(
        props: Optional<QuestionProps, 'createdAt' | 'slug' | 'attachments'>, 
        id?: UniqueEntityId) {
        const question = new Question({
            ...props,
            createdAt: props.createdAt ?? new Date(),
            slug: props.slug ?? Slug.createFromText(props.title),
            attachments: props.attachments ?? new QuestionAttachmentList()
        }, id)

        return question
    }

}

