# DDD Forum Domain

This project is a TypeScript implementation of a forum domain following Domain-Driven Design (DDD) principles. It focuses on entities, value objects, repositories, and application use cases rather than infrastructure details.

## Project structure

- src/core: shared core abstractions such as entities, unique IDs, and utility types
- src/domain/forum/enterprise: domain entities and value objects
- src/domain/forum/application: use cases and repository contracts
- test: factories and in-memory repositories used for tests

## Main concepts

The domain includes forum features such as:

- creating, editing, deleting, and listing questions
- answering questions
- choosing the best answer
- commenting on questions and answers
- deleting comments by their author

## Technologies

- TypeScript
- Vitest
- Faker
- Day.js

## Getting started

Install the dependencies:

```bash
npm install
```

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

## Testing approach

The project uses Vitest with in-memory repositories and factories to test domain behavior in isolation. This keeps the use cases focused on business rules.
