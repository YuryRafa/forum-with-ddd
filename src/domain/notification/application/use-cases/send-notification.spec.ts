import {describe, expect, it} from 'vitest'
import { beforeEach } from 'vitest'
import { InMemoryNotificationsRepository } from '../../../../../test/repositories/in-memory-notifications-repository.js'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js'
import { SendNotification } from './send-notification.js'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository 
let sut: SendNotification

describe('Send notification', () => {

    beforeEach(() => {
        inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
        sut = new SendNotification(inMemoryNotificationsRepository)
        
    })

    it('Should be able to send a notification to a user', async () => {   
        const result = await sut.execute({
            recipientId: '1',
            title: 'Notification',
            content: 'notification content',
        })

        expect(result.isRight()).toBe(true)
        if (result.isRight()) {
            const { notification } = result.value
        
            expect(notification.id).toBeTruthy()
            expect(inMemoryNotificationsRepository.items[0]?.id).toEqual(notification.id)
            expect(notification.content).toEqual('notification content')

        }
        

        
    })

}) 

