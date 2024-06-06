import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import userService from '../../services/user';
import bcrypt from 'bcryptjs'; // Import bcrypt library
import "./editpage.css";

export const EditPage = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); // Access user ID from URL params

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await userService.getUserById(id);
        setUser(fetchedUser);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Hash the password before updating the user
      const hashedPassword = await bcrypt.hash(user.password, 10); // Hash password with bcrypt
      const updatedUser = { ...user, password: hashedPassword }; // Update user object with hashed password
      await userService.updateUser(id, updatedUser); // Call updateUser function with hashed password
      navigate('/profile');
    } catch (error) {
      console.error(error);
      setError('Error updating profile. Please try again.');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'DOB') { // Handle date separately
      const date = new Date(value);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensure double-digit month
      const day = date.getDate().toString().padStart(2, '0'); // Ensure double-digit day
      const formattedDate = `${year}-${month}-${day}`;
      setUser((prevUser) => ({
        ...prevUser,
        [name]: formattedDate
      }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value
      }));
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={user.firstName || ''}
          onChange={handleChange}
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={user.lastName || ''}
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          value={user.email || ''}
          onChange={handleChange}
          disabled // Disable email input as it's the unique identifier
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          name="password"
          value={user.password || ''}
          onChange={handleChange}
        />
        <label htmlFor="DOB">DOB:</label>
        <input
          id="DOB"
          type="date"
          name="DOB"
          value={user.DOB || ''}
          onChange={handleChange}
        />
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          name="gender"
          value={user.gender || ''}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};
