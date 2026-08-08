import { expect, test } from "vitest"
import { right, left, type Either } from "./either.js"

function doSomething(shouldSuccess: boolean): Either<string, string>{
    if(shouldSuccess) {
        return right('success')
    } else {
        return left('error')
    }
}

test('Success result'), () => {
    const result = doSomething(true)

    expect(result.isLeft()).toBe(true)
    expect(result.isRight()).toBe(false)
}

test('Error result'), () => {
    const result = doSomething(false)

    expect(result.isRight()).toBe(true)
    expect(result.isLeft()).toBe(false)
}