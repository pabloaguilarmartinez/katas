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
import { MissingTemplateTextError, parseTemplate } from '../core/templateEngine';

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
      const expectedParsedText = 'This is a template with a foo';

      const parsedTemplate = parseTemplate(templateText, variables);

      expect(parsedTemplate.text).toBe(expectedParsedText);
    });

    it('parses template with two variables', () => {
      const templateText = 'This is a template with a ${variable} and ${anotherVariable}';
      const variables = { variable: 'foo', anotherVariable: 'bar' };
      const expectedParsedText = 'This is a template with a foo and bar';

      const parsedTemplate = parseTemplate(templateText, variables);

      expect(parsedTemplate.text).toBe(expectedParsedText);
    });

    it('parses template with repeated variables', () => {
      const templateText = 'This is a template with a ${variable} and ${variable}';
      const variables = { variable: 'foo' };
      const expectedParsedText = 'This is a template with a foo and foo';

      const parsedTemplate = parseTemplate(templateText, variables);

      expect(parsedTemplate.text).toBe(expectedParsedText);
    });
  });

  describe('Edge cases', () => {
    it('does not parse template if it is null', () => {
      expect(() => parseTemplate(null, {})).toThrow(new MissingTemplateTextError());
    });

    it('does not parse template if it is undefined', () => {
      expect(() => parseTemplate(undefined, {})).toThrow(new MissingTemplateTextError());
    });

    it('warns about variables not being found', () => {
      const templateText = 'This is a template with a ${variable}';
      const variables = { anotherVariable: 'bar' };

      const parsedTemplate = parseTemplate(templateText, variables);

      expect(parsedTemplate.containsWarnings()).toBeTruthy();
      expect(parsedTemplate.warnings[0].message).toBe('Variable anotherVariable not found in template');
    });
  });
});
