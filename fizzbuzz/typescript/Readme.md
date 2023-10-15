# Kata Fizzbuzz using TypeScript
Write a program that displays numbers from 1 to 100, replacing multiples of 3 with the word "fizz" and multiples of 5 with "buzz". For numbers that are themselves multiples of 3 and 5, we will use the string "fizzbuzz".

## Stack
* TypeScript
* Jest
* ESLint
* Prettier
* Husky

## Instructions
* `nvm use`
* `npm install`
* `npm test`

### ESLint
[TypeScript ESLint Rules](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin)

### Husky hooks
* Pre-commit: Execute npm analize (tsc + eslint --fix)
* Pre-push: Execute test
