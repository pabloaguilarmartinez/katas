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
import { MissingTemplateTextError, MissingValueError, parseTemplate } from '../core/templateEngine';

describe('The Template Engine', () => {
  describe('Happy paths', () => {
    it('parses template without variables', () => {
      const templateText = 'This is a template with zero variables';
      const variables = {};

      const result = parseTemplate(templateText, variables);

      expect(result.text).toBe(templateText);
    });

    it('parses template with one variable', () => {
      const templateText = 'This is a template with a ${variable}';
      const variables = { variable: 'foo' };
      const expectedResult = 'This is a template with a foo';

      const actualResult = parseTemplate(templateText, variables);

      expect(actualResult.text).toBe(expectedResult);
    });

    it('parses template with two variables', () => {
      const templateText = 'This is a template with a ${variable} and ${anotherVariable}';
      const variables = { variable: 'foo', anotherVariable: 'bar' };
      const expectedResult = 'This is a template with a foo and bar';

      const actualResult = parseTemplate(templateText, variables);

      expect(actualResult.text).toBe(expectedResult);
    });

    it('parses template with repeated variables', () => {
      const templateText = 'This is a template with a ${variable} and ${variable}';
      const variables = { variable: 'foo' };
      const expectedResult = 'This is a template with a foo and foo';

      const actualResult = parseTemplate(templateText, variables);

      expect(actualResult.text).toBe(expectedResult);
    });
  });

  describe('Edge cases', () => {
    it('does not parse template if it is null', () => {
      expect(() => parseTemplate(null, {})).toThrow(new MissingTemplateTextError());
    });

    it('does not parse template if it is undefined', () => {
      expect(() => parseTemplate(undefined, {})).toThrow(new MissingTemplateTextError());
    });

    it('does not parse template if variables are not being found', () => {
      const templateText = 'This is a template with a ${variable}';
      const variables = { anotherVariable: 'bar' };

      expect(() => parseTemplate(templateText, variables)).toThrow(new MissingValueError('variable'));
    });
  });
});
