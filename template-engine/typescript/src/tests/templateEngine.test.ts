/*
'This is a template with zero variables' -> 'This is a template with zero variables'
'This is a template with a ${variable}', {variable: 'foo'} -> 'This is a template with a foo'
'This is a template with a ${variable} and ${anotherVariable}', {variable: 'foo', anotherVariable: 'bar'}
    -> 'This is a template with a foo and bar'
*/
describe('The Template Engine', () => {
  it('parses template without variables', () => {
    const template = 'This is a template with zero variables';
    const variables = {};

    const result = templateEngine(template, variables);

    expect(result).toBe(template);
  });

  it('parses template with one variable', () => {
    const template = 'This is a template with a ${variable}';
    const variables = { variable: 'foo' };
    const expectedResult = 'This is a template with a foo';

    const actualResult = templateEngine(template, variables);

    expect(actualResult).toBe(expectedResult);
  });
});

function templateEngine(template: string, variables: { [key: string]: string }) {
  let parsedTemplate = template;
  for (const variable in variables) {
    const regex = new RegExp(`\\$\\{${variable}\\}`, 'g');
    parsedTemplate = parsedTemplate.replace(regex, variables[variable]);
  }

  return parsedTemplate;
}
