import { useState, useEffect } from 'react';
import { getUserProfile } from '../../services/users';
import { ProfileUpdate } from './ProfileUpdate';

const Profile = ({ userId }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await getUserProfile(userId);
        setProfile(userProfile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    // useEffect will only run if userId changes (code runs again)

    fetchUserProfile();
  }, [userId]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Email: {profile.email}</p>
      <p>First Name: {profile.firstName}</p>
      <p>Last Name: {profile.lastName}</p>
      <p>Bio: {profile.bio}</p>
      <ProfileUpdate profile={profile} />
    </div>
  );
};

export default Profile;
