/*
'This is a template with zero variables' -> 'This is a template with zero variables'
'This is a template with a ${variable}', {variable: 'foo'} -> 'This is a template with a foo'
'This is a template with a ${variable} and ${anotherVariable}', {variable: 'foo', anotherVariable: 'bar'}
    -> 'This is a template with a foo and bar'
*/
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

function parseTemplate(templateText: string, variables: { [key: string]: string }) {
  let parsedText = templateText;
  for (const key in variables) {
    const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
    parsedText = parsedText.replace(regex, variables[key]);
  }
  return parsedText;
}
