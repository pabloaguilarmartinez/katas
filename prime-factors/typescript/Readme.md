# Kata Prime Factors using TypeScript
In this exercise our objective will be to write a program that decomposes a natural number into its prime factors. 
For it, we will create a function primeFactors, to which we pass the number that we want to decompose and it will return
us an array with the prime factors, ordered from smaller to greater.

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
