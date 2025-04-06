export function parseTemplate(templateText: string, variables: { [key: string]: string }): ParsedTemplate {
  if (!templateText) return new ParsedTemplate('', [new TemplateWarning('Template text is not defined')]);
  if (!variables) return new ParsedTemplate(templateText, [new TemplateWarning('Variables is not defined')]);

  const warnings: TemplateWarning[] = [];
  let parsedText = templateText;

  for (const key in variables) {
    const value = variables[key];
    parsedText = parsedText.replace(variableRegex(key), value);
    checkIfVariableIsInTemplate(parsedText, value, key, warnings);
  }
  checkNotReplacedVariables(parsedText, warnings);

  return new ParsedTemplate(parsedText, warnings);
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

function checkIfVariableIsInTemplate(parsedText: string, value: string, key: string, warnings: TemplateWarning[]) {
  if (!parsedText.includes(value)) {
    warnings.push(new TemplateWarning(`Variable ${key} not found in template`));
  }
}

function checkNotReplacedVariables(parsedText: string, warnings: TemplateWarning[]) {
  const regex = /\$\{([a-zA-Z0-9-]+)}/g;
  const matches = parsedText.match(regex);
  matches?.forEach((match) => {
    const variableName = match.substring(2, match.length - 1);
    warnings.push(new TemplateWarning(`Variable ${variableName} could not be replaced`));
  });
}

function variableRegex(variableName: string): RegExp {
  return new RegExp(`\\$\\{${variableName}\\}`, 'g');
}
