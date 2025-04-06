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
});
