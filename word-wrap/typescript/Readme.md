# Kata Word Wrap using TypeScript
It basically involves developing the algorithm implemented by many text editors such as Notepad ++ or gedit, where lines
of text that do not fit in the width of the window are split into shorter lines so that the text can be read in the same
width.

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
