const Profile = require("../models/profile");
const User = require("../models/user");
const { generateToken } = require("../lib/token");

const getMyProfile = async (req, res) => {
  const profile = await Profile.findOne({ author: req.user_id }).populate({
    path: "author",
    select: "username  profilePictureURL -_id", // Only fetch the username field and exclude the MongoDB default '_id' field
  });
  if (!profile) {
    return res.status(404).json({ message: "Profile not found" });
  }
  const token = generateToken(req.user_id);
  res.status(200).json({ profile: profile, token: token });
};

const getProfile = async (req, res) => {
  // const posts = await Post.find().populate("author", "email");
  const profile = await Profile.find().populate({
    path: "author",
    select: "username -_id", // Only fetch the username field and exclude the MongoDB default '_id' field
  });
  const token = generateToken(req.user_id);
  res.status(200).json({ profile: profile, token: token });
};


const updateMyImage = async (req, res) => { 
  try { 
    const { profilePictureURL} = req.body; 
    const profile = await Profile.findOneAndUpdate(
      { author: req.user_id },
      { profilePictureURL: profilePictureURL},
      { new: true } );
      if (!profile) {
      return res.status(404).json({ message: "Profile not found" }); }
      const token = generateToken(req.user_id); 
      res.status(200).json({ profile: profile, token: token }); }
          catch (error) {
          res.status(500).json({ message: error.message });
       }};

const updateMyBio = async (req, res) => { 
  try { 
    const { bio} = req.body; 
    const profile = await Profile.findOneAndUpdate(
      { author: req.user_id },
      { bio: bio},
      { new: true } );
      if (!profile) {
      return res.status(404).json({ message: "Profile not found" }); }
    const token = generateToken(req.user_id); 
    res.status(200).json({ profile: profile, token: token }); }
        catch (error) {
          res.status(500).json({ message: error.message });
       }};






const ProfileController = {
  getProfile: getProfile,
  getMyProfile: getMyProfile,

  updateMyImage: updateMyImage,

  updateMyBio: updateMyBio,

};

module.exports = ProfileController;

