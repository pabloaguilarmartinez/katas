# BankingKata using Typescript
Our application must allow:
- Make a deposit into the account
- Withdraw from the account
- Print the entries of the account through the console

The result of printing the entries should look like the following:
```
Date       | Amount | Balance
14/01/2022 | 2000.00   | 2500.00
13/01/2022 | -500.00   | 500.00
10/01/2022 | 1000.00   | 1000.0
```
The only restriction the exercise has is that we must respect the interface of the class you are looking at, and we 
cannot add any other public methods.
```typescript
export class Account {
  deposit(amount: number): void 
  withdraw(amount: number): void 
  printStatement(): void 
}
```

## Stack
* TypeScript
* Jest
* ESLint
* Prettier
* Husky

## Instructions
* `npm install`
* `npm test`

### ESLint
[TypeScript ESLint Rules](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin)

### Husky hooks
* Pre-commit: Execute npm analize (tsc + eslint --fix)
* Pre-push: Execute test
