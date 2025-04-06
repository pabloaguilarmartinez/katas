/*
Happy paths:
'This is a template with zero variables' -> 'This is a template with zero variables'
'This is a template with a ${variable}', {variable: 'foo'} -> 'This is a template with a foo'
'This is a template with a ${variable} and ${anotherVariable}', {variable: 'foo', anotherVariable: 'bar'}
    -> 'This is a template with a foo and bar'

Edge cases:
- Variables not being found
- Non replaced variables
- Null text & null dictionary
*/
import { parseTemplate } from '../core/templateEngine';

describe('The Template Engine', () => {
  it('parses template without variables', () => {
    const templateText = 'This is a template with zero variables';
    const variables = {};

    const result = parseTemplate(templateText, variables);

    expect(result).toBe(templateText);
  });

  it('parses template with one variable', () => {
    const templateText = 'This is a template with a ${variable}';
    const variables = { variable: 'foo' };
    const expectedResult = 'This is a template with a foo';

    const actualResult = parseTemplate(templateText, variables);

    expect(actualResult).toBe(expectedResult);
  });

  it('parses template with two variables', () => {
    const templateText = 'This is a template with a ${variable} and ${anotherVariable}';
    const variables = { variable: 'foo', anotherVariable: 'bar' };
    const expectedResult = 'This is a template with a foo and bar';

    const actualResult = parseTemplate(templateText, variables);

    expect(actualResult).toBe(expectedResult);
  });

  it('parses template with repeated variables', () => {
    const templateText = 'This is a template with a ${variable} and ${variable}';
    const variables = { variable: 'foo' };
    const expectedResult = 'This is a template with a foo and foo';

    const actualResult = parseTemplate(templateText, variables);

    expect(actualResult).toBe(expectedResult);
  });
});
