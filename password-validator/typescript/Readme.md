# Kata Password Validator using TypeScript
We are going to program a boolean function that indicates whether a given password meets some strength requirements. 
For the function to produce a true result, the password must:

* Be at least six characters long
* Contain some number
* Contain some uppercase letter
* Contain any lowercase letters
* Contain any underscore

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
