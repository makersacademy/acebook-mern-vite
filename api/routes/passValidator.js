const validatePassword = (password) => {
    const minLength = 7;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialCharacter = /[!$%&]/.test(password);
  
    return password.length >= minLength && hasUpperCase && hasSpecialCharacter;
  };
  
  module.exports =  validatePassword 
  