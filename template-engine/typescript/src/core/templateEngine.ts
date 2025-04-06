export function parseTemplate(templateText: string, variables: { [key: string]: string }): ParsedTemplate {
  const warnings: TemplateWarning[] = [];
  ensureTemplateTextIsValid(templateText);

  let parsedText = templateText;
  for (const key in variables) {
    parsedText = parsedText.replace(variableRegex(key), variables[key]);
    if (!parsedText.includes(variables[key])) {
      warnings.push(new TemplateWarning(`Variable ${key} not found in template`));
    }
  }
  const regex = /\$\{([a-zA-Z0-9-]+)}/g;
  const matches = parsedText.match(regex);
  matches?.forEach((match) => {
    const variableName = match.substring(2, match.length - 1);
    warnings.push(new TemplateWarning(`Variable ${variableName} could not be replaced`));
  });
  return new ParsedTemplate(parsedText, warnings);
}

function ensureTemplateTextIsValid(templateText: string) {
  if (!templateText) {
    throw new MissingTemplateTextError();
  }
}

function variableRegex(variableName: string): RegExp {
  return new RegExp(`\\$\\{${variableName}\\}`, 'g');
}

export class MissingTemplateTextError extends Error {
  constructor() {
    super('Template text is missing');
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
