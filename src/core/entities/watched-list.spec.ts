import { describe, it, expect } from 'vitest';
import  { WatchedList } from './watched-list.js';


class NumberWatchedList extends WatchedList<number> {
    compareItems(a: number, b: number): boolean {
        return a === b
    }
}

describe('WatchedList', () => {
    it('should be able to create a watched list with initial items', () => {
        const list = new NumberWatchedList([1, 2, 3])


        expect(list.currentItems.length).toBe(3)
        expect(list.getItems()).toEqual([1, 2, 3])
        expect(list.getNewItems()).toEqual([])
        expect(list.getRemovedItems()).toEqual([])
    })

    it('should be able to add new items to the watched list', () => {
        const list = new NumberWatchedList([1, 2, 3])
        list.add(4)
        list.add(5)

        expect(list.getItems()).toEqual([1, 2, 3, 4, 5])
        expect(list.getNewItems()).toEqual([4, 5])
        expect(list.getRemovedItems()).toEqual([])
    })

    it('should be able to remove items from the watched list', () => {
        const list = new NumberWatchedList([1, 2, 3])

        list.remove(2)

        expect(list.currentItems).toHaveLength(2)
        expect(list.getRemovedItems()).toEqual([2])
    })
    
    it('should be able to add items even if it was removed from the watched list before', () => {
        const list = new NumberWatchedList([1, 2, 3])

        list.remove(2)
        list.add(2)

        expect(list.currentItems).toHaveLength(3)
        expect(list.getRemovedItems()).toEqual([])
        expect(list.getNewItems()).toEqual([])

    })

    it('should be able to remove items even if it was added to the watched list before', () => {
        const list = new NumberWatchedList([1, 2, 3])

        list.add(4)
        list.remove(4)

        expect(list.currentItems).toHaveLength(3)
        expect(list.getRemovedItems()).toEqual([])
        expect(list.getNewItems()).toEqual([])

    })

    it('should be able to update watched list items', () => {
        const list = new NumberWatchedList([1, 2, 3])
        list.update([2, 3, 4, 5])

        expect(list.getItems()).toEqual([2, 3, 4, 5])
        expect(list.getNewItems()).toEqual([4, 5])
        expect(list.getRemovedItems()).toEqual([1])


    })


})