export function parseTemplate(templateText: string, variables: { [key: string]: string }): ParsedTemplate {
  ensureTemplateTextIsValid(templateText);
  ensureTemplateTextVariablesAreInTheDictionary(templateText, variables);

  let parsedText = templateText;
  for (const key in variables) {
    parsedText = parsedText.replace(variableRegex(key), variables[key]);
  }
  return new ParsedTemplate(parsedText, []);
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

export class TemplateWarning {
  constructor(readonly message: string) {}
}

export class ParsedTemplate {
  constructor(
    readonly text: string,
    readonly warnings: ReadonlyArray<TemplateWarning>
  ) {}

  containsWarnings(): boolean {
    return this.warnings.length > 0;
  }
}
