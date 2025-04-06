# Kata Template Engine using TypeScript

Develop a templating library which replaces certain marked text using a dictionary of variables. The function takes two 
arguments, the template text and the dictionary. Expecting that the output will be the replaced text.

### Example
Input:
- This is a template with one ${variable}
- {[variable]: "foo"}

Output:
- This is a template with one foo

### Complex Example
Input:
- This is a text with a \${variable} to be replaced and this is another text with ${another-variable} to be replaced. \n
And this is another text with \${another-variable-2} to be replaced.
- {variable: "value", another-variable: "another-value", another-variable-2: "another-value-2"}

Output:
- This is a text with a value to be replaced and this is another text with another-value to be replaced. \n
  And this is another text with another-value-2 to be replaced.

## Edge cases
One of the more interesting aspects of this kata are the edge cases. This is going to be an open source library, 
potentially used for a wide variety of problems. We can't anticipate all the possible scenarios, so it's important to 
handle all cases. Please consider de cases of nulls, empties, variables not found in the dictionary, variables not used 
int the dictionary...

Consider the case of empty string as a key in the dictionary, and the case of values that are not convertible to string 
(not serializable)...

How would you design the library in a way that is resilient, intuitive, and comfortable to use?

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
