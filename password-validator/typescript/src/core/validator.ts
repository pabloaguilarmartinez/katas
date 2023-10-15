const minimumNumberOfCharacters = 6;

export function isStrongPassword(password: string): boolean {
	return isLongEnough(password)
        && containsANumber(password)
        && containsALowercase(password)
        && containsAnUppercase(password)
        && containsUnderscore(password);
}

function isLongEnough(password: string): boolean {
    return password.length >= minimumNumberOfCharacters;
}

function containsANumber(password: string): boolean {
    return /\d/.test(password);
}

function containsALowercase(password: string): boolean {
    return /[a-z]/.test(password);
}

function containsAnUppercase(password: string): boolean {
    return /[A-Z]/.test(password);
}

function containsUnderscore(password: string): boolean {
    return /_/.test(password);
}
