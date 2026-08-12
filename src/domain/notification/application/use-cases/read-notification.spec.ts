import {describe, expect, it} from 'vitest'
import { beforeEach } from 'vitest'
import { InMemoryNotificationsRepository } from '../../../../../test/repositories/in-memory-notifications-repository.js'
import { ReadNotification } from './read-notification.js'
import { makeNotification } from '../../../../../test/factories/make-notification.js'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository 
let sut: ReadNotification

describe('Read notification', () => {

    beforeEach(() => {
        inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
        sut = new ReadNotification(inMemoryNotificationsRepository)
        
    })

    it('Should be able to mark a notification as read', async () => {   
        
        const notification = makeNotification({
            recipientId: new UniqueEntityId('user-1')
        }, new UniqueEntityId('notification-1'))

        inMemoryNotificationsRepository.items.push(notification)
        
        const result = await sut.execute({
            recipientId: 'user-1',
            notificationId: 'notification-1'
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryNotificationsRepository.items[0]!.readAt).toEqual(notification.readAt)
        

        
    })

}) 

