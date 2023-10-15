const nothingToAdd = 0;

export function calculate(expression: string): number {
    if (!expression) return 0;
    const startOfConfig = '//';
    let separator = ',';
    if (expression.startsWith(startOfConfig)) {
        const endOfConfig = '/';
        separator = getSeparator(expression, startOfConfig, endOfConfig);
        expression = removeConfigFrom(expression, endOfConfig);
    }
    return expression
        .split(separator)
        .map(getNumber)
        .reduce(sum);
}

function getSeparator(expression: string, startOfConfig: string, endOfConfig: string): string {
    return expression.slice(startOfConfig.length, expression.lastIndexOf(endOfConfig));

}

function removeConfigFrom(expression: string, endOfConfig: string): string {
    return expression.slice(expression.lastIndexOf(endOfConfig) + 1);

}

function getNumber(element: string): number {
    const parsedElement = Number(element);
    return isNaN(parsedElement) ? nothingToAdd : parsedElement;
}

function sum(previousNumber: number, currentNumber: number): number {
    return previousNumber + currentNumber;
}
