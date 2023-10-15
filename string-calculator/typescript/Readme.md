# Kata String Calculator using TypeScript
This kata proposes the implementation of a function that performs the sum of the elements of an expression received as a
parameter in the form of a string.

This expression has some particularities. Let's see the different use cases that we must cover:
1. In the case of receiving null or an empty string, the function must return 0. 
2. In the case of receiving only a number in string format, it must convert it to a numeric type and return it.
3. In the case of receiving several numbers, it must correctly return the result of the sum. The numbers will be 
separated, by default, by commas.
4. It could be the case that some of the elements separated by commas is a non-numeric character, such as, for example, 
a letter. These values should not affect the total result.
5. Finally, the function must support custom separators. For this purpose, the first part of the expression will 
indicate the configuration. The beginning of the configuration will be given by a double slash, then the next character 
would be the separator chosen by the user and the end of the configuration is indicated by another slash.

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
