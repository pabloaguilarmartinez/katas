# Kata UpperCamelCase Converter using TypeScript

In this kata we are asked to implement a pure function that converts a text, whose words are delimited by hyphens, underscores, underscores and spaces, into camel case format.

Within the camel case style, there are two, mainly: the UpperCamelCase, better known as PascalCase, which is given when the first letter of each of the words is uppercase, and lowerCamelCase, which is the same as the previous one with the exception that the first letter is lowercase.

In our case we are going to implement the first one, the PascalCase style.

Including:
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
