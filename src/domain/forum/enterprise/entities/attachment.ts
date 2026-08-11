import { Entity } from "../../../../core/entities/entity.js";
import type { UniqueEntityId } from "../../../../core/entities/unique-entity-id.js";

interface AttachhmentProps {
    title: string
    link: string
    parentId: string
    parentType: 'answer' | 'question'
}   


export class Attachment extends Entity<AttachhmentProps>{
    get title() {
        return this.props.title
    }

    get link(){
        return this.props.link
    }

    static create(props: AttachhmentProps, id?: UniqueEntityId){
        const attachment = new Attachment(props, id)

        return attachment
    }
}