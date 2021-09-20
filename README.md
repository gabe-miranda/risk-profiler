# Risk Profiler

This project is based on the Origin backend take-home assignment, available [here](https://github.com/OriginFinancial/origin-backend-take-home-assignment).

## How this app was developed

The entire project was developed using **TypeScript** on top of **NestJS**, a framework that provides an out-of-the-box application architecture that helps to create a highly testable, scalable, and easy to maintain the application. We're using **Prettier+ESLint** to ensure standard good practices defined by the TypeScript community. Jest is handling all the testing along with a Nest helper lib.

Under the hood, Nest makes use of robust HTTP Server frameworks like Express to handle all the requests by default.

## Installation

```bash
# set your node version to the same version inside .nvmrc
# (Optional but suggested)
$ nvm use

$ npm install
```

## Running the app

```bash
# app running on port 3000
$ npm run start
```

## Making requests

The API accepts POST requests via the endpoint `/risk/profile`.

### Example via curl

```bash
$ curl -H "Content-Type:application/json" \
-X POST -d '
  {
    "age": 27,
    "dependents": 0,
    "house": {"ownership_status": "owned"},
    "income": 250000,
    "marital_status": "single",
    "risk_questions": [0, 0, 0],
    "vehicle": {"year": 2018}
  }
' http://localhost:3000/risk/profile
```

### Insomnia

An insomnia collection with a few requests used during the development for testing is available in the [insomnia.json](insomnia.json) file.

## Input validation

To validate the incoming requests we're taking advantage of Nest `ValidationPipe`. The actual validation code is all based on the declarative decorators annotated inside our DTO and model declarations, like the example:

```typescript
@Min(0) // Validate that the value is a minimum of 0.
@IsInt() // Ensure that the value is a integer.
age: number;
```

We don't need to use the same validation to the output data due to TypeScript type safety.

## Tests

The test approach adopted was testing all the internal risk providers that handle all the risk algorithm rules, so we can ensure the rules inside these pure functions. We also test the risk service to ensure that all providers work together and test the controller to see the entire service working.

The e2e test alongside testing the rules again can show problems during the application bootstrap event.

### Running the tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```
