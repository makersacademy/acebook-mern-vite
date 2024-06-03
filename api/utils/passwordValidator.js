// at least 8 characters long
const lengthValidator = (password) => {
    const regex = /^.{8,}$/;
    return regex.test(password);
}
// uppercase and lowercase

// at least one number

// at least one special character

module.exports = lengthValidator;
console.log(lengthValidator('Password1'));
console.log(lengthValidator('Hello'))