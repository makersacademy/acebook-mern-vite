export const passwordValidator = (password) => {
    const regexLength = /^.{8,}$/;
    const regexCase = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
    const regexNumber = /^(?=.*\d).+$/;
    const regexSpecialCharacter = /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let checks = {"length": regexLength.test(password),
        "case": regexCase.test(password),
        "number": regexNumber.test(password),
        "special character": regexSpecialCharacter.test(password)
    };
    return checks;
}