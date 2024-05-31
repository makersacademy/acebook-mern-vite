const signup = async (req, res) => {
    const { firstName, lastName, email, password, dob } = req.body;
  
    try {
      // Check if user with the same email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }
  
      // Create a new user record
      const newUser = new User({
        firstName,
        lastName,
        email,
        password, // You may want to hash the password here before saving to the database
        dob
      });
  
      // Save the user record to the database
      await newUser.save();
  
      // Generate token for the newly created user
      const token = generateToken(newUser.id);
  
      // Respond with success message and token
      res.status(201).json({ token, message: 'User registered successfully' });
    } catch (error) {
      console.error('Error signing up:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const AuthenticationController = {
    signup
  };
  
  module.exports = AuthenticationController;