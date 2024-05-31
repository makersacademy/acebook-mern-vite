const validatePassword = (password) => {
  const minLength = 7;
  const uppercasePattern = /[A-Z]/;
  const specialCharacterPattern = /[!$%&]/;

  return (
    password.length >= minLength &&
    uppercasePattern.test(password) &&
    specialCharacterPattern.test(password)
  );
};

export default validatePassword;