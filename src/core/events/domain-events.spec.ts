import { describe } from "node:test";
import { AggregateRoot } from "../entities/aggregate-root.js";
import type { UniqueEntityId } from "../entities/unique-entity-id.js";
import type { DomainEvent } from "./domain-event.js";
import { expect, it, vi } from "vitest";
import { DomainEvents } from "./domain-events.js";


class CustomAggregateCreated implements DomainEvent {
    public ocurredAt: Date
    private aggregate: CustomAggregate

    constructor(aggregate: CustomAggregate){
        this.aggregate = aggregate
        this.ocurredAt = new Date()
    }

    public getAggregateId(): UniqueEntityId {
        return this.aggregate.id
    }
}

class CustomAggregate extends AggregateRoot<null>{
    static create(){
        const aggregate = new CustomAggregate(null)

        aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))
       
       
        return aggregate

    }
}

describe("Domain Events", () => {
    it('should be able to dispatch and listen to events', () => {
    
    const callbackSpy = vi.fn()
    
    // Subscriber cadastrado (ouvinte do evento)
    DomainEvents.register(() => {
        callbackSpy()
    }, CustomAggregateCreated.name)

    // Criando uma resposta porem SEM salvar no banco
    const aggregate = CustomAggregate.create()

    // Estou assegurando que o evento foi criado porem NAO foi disparado
    expect(aggregate.domainEvents).toHaveLength(1)

    // Salvando a resposa no banco e assim disparando o evento
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    // Subscriber ouve o evento e faz o que precisa ser feito com o dado
    expect(callbackSpy).toHaveBeenCalled()
    expect(aggregate.domainEvents).toHaveLength(0)

    })
})