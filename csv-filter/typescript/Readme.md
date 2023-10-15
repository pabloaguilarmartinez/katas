# Kata CSV filter using TypeScript
The proposal is a small program that filters the data of a file in .csv format (comma separated values) to return 
another .csv file.

It is a .csv with invoice information. Each line is part of the invoice data, except for the first line which contains 
the name of the fields. As you can see in the slide, this would be an example of the file.

``` text
Num_invoice, Date, Gross, Net, VAT, IGIC, Concept, CIF_customer, NIF_customer
1,02/05/2019,1008,810,19,,ACERLaptop,B76430134,
2,03/08/2019,2000,2000,,8,MacBook Pro,,78544372A
3,03/12/2019,1000,2000,19,8, LenovoLaptop,,78544372A
```

To simplify the implementation we are going to skip the part of reading and generating a file to focus on the logic and 
data analysis.

After analyzing it with the business specialists the rules are:

* It is valid that some fields are empty, appearing two commas in a row or a final comma.
* The invoice number cannot be repeated, if it is, we will eliminate all the lines with repetition.
* VAT and IGIC taxes are exclusive, that is to say, only one of the two can be applied. If any line has content in both 
fields it must be left out.
* The fields CIF and NIF are exclusive, only one of them can be used.
* The net amount is the result of applying the corresponding tax to the gross amount. If any net is not well calculated,
the line is left out.

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
