const create = async (req, res) => {
  const { email } = req.params; // Access email parameter from URL
  const { firstName, lastName, password, DOB, gender } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Create a new user
    const newUser = new User({ email, firstName, lastName, password, DOB, gender });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  create,
};