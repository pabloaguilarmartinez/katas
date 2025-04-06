export function parseTemplate(templateText: string, variables: { [key: string]: string }) {
  ensureTemplateTextIsValid(templateText);
  ensureTemplateTextVariablesAreInTheDictionary(templateText, variables);

  let parsedText = templateText;
  for (const key in variables) {
    parsedText = parsedText.replace(variableRegex(key), variables[key]);
  }
  return parsedText;
}

function ensureTemplateTextIsValid(templateText: string) {
  if (!templateText) {
    throw new MissingTemplateTextError();
  }
}

function ensureTemplateTextVariablesAreInTheDictionary(templateText: string, variables: { [key: string]: string }) {}

function variableRegex(variableName: string): RegExp {
  return new RegExp(`\\$\\{${variableName}\\}`, 'g');
}

export class MissingTemplateTextError extends Error {
  constructor() {
    super('Template text is missing');
  }
}

export class MissingValueError extends Error {
  constructor(variableName: string) {
    super(`Variable ${variableName} value is missing`);
  }
}
