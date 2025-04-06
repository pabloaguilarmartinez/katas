export function parseTemplate(templateText: string, variables: { [key: string]: string }) {
  let parsedText = templateText;
  for (const key in variables) {
    const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
    parsedText = parsedText.replace(regex, variables[key]);
  }
  return parsedText;
}
