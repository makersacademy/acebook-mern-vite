const Profile = require("../models/profile");
const User = require("../models/user");
const { generateToken } = require("../lib/token");


const getProfile = async (req, res) => {
        // const posts = await Post.find().populate("author", "email");
    const profile = await Profile.find().populate({
          path: "author",
          select: "username -_id", // Only fetch the username field and exclude the MongoDB default '_id' field
        });
    const token = generateToken(req.user_id);
        res.status(200).json({ profile: profile, token: token });
};

const createProfile = async (req, res) => {
    const profile = new Profile({
      bio: req.body.bio,
      author: req.user_id,
      profilepicture: req.body.profilepicture
    });
    await profile.save();

    const user = await User.findById(req.user_id, "username -_id");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    };
    const newToken = generateToken(req.user_id);
      res.status(201).json({
        message: "Profile created",
        profile: {
          _id: profile._id,
          bio: profile.bio,
          profilepicture: profile.profilepicture,
          author: user.username,
        },
        token: newToken,
        test: "test",
      });
      module.exports = {
        getProfile,
        createProfile,
    };
};


const ProfileController = {
        getProfile: getProfile,
        createProfile: createProfile,
      };
      
      module.exports = ProfileController;

// const editProfile = Profile({
//     const query = {'username': req.user.username, 'bio': req.body.bio, 'profilepicture': req.body.profilepicture},
//     req.newData.username = req.user.username,
//     bio: req.body.bio,
//     author: req.user_id, // Assuming `user_id` is attached to `req` by authentication middleware
//     profilepicture: req.body.profilepicture
//   });
//   // const post = new Post({ message: req.body, author: req.user_id });
//   await profile.save();

//   const user = await User.findById(req.user_id, "username -_id");
//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }};

//   var query = {'username': req.user.username};
//   req.newData.username = req.user.username;
  
//   MyModel.findOneAndUpdate(query, req.newData, {upsert: true}, function(err, doc) {
//       if (err) return res.send(500, {error: err});
//       return res.send('Succesfully saved.');
//   });