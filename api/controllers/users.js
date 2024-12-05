const User = require("../models/user");
const { generateToken } = require("../lib/token");
const Photo = require("../models/photo")

function create(req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const following = [];

  const user = new User({ firstName, lastName, username, email, password, following });
  user
    .save()
    .then((user) => {
      console.log("User created, id:", user._id.toString());
      res.status(201).json({ message: "OK" });
    })
    .catch((err) => {
      console.error(err);
      console.log("I was triggered, user not saved to db")
      res.status(400).json({ message: "Something went wrong" });
    });
}

















async function getUsers(req, res) {
  const users = await User.find()
  // res.status(200).json({users: users})

  const usersWithProfilePhotos = await Promise.all( 
    users.map(async (user) => {

    const user_id = user._id.toString();

    const photo = await Photo.find({ user_id: user_id });
    let filePath
    if (photo.length === 0) {
      filePath = "uploads/default_photo.webp"
    } else {
      filePath = photo[0].photoFilePath
    }


    const enrichedUser = {
      ...user._doc,
      filePath: filePath,
    };
    // console.log('enrichedPost:');
    // console.log(enrichedPost);
    return enrichedUser;
  }))
  res.status(200).json({users: usersWithProfilePhotos})
}






























async function getUserProfile(req, res) {
  const user = await User.find({ _id: req.user_id });
  const token = generateToken(req.user_id);

  const returnUserData = {
    firstName: user[0].firstName,
    lastName: user[0].lastName,
  }
  res.status(200).json({ userData: returnUserData, token: token });
}





















async function getAnyUserProfile(req, res) {
  const currentUser = await User.find({ _id: req.user_id });
  const queryUser = await User.find({ username: req.params.username });
  const photo = await Photo.find({ user_id: queryUser[0]._id.toString() });
  let following = true;
  if (currentUser[0].username != queryUser[0].username) {
    console.log ("LOOK AT THIS ONE --->", currentUser[0].following);
    following = currentUser[0].following.includes(queryUser[0]._id);
    console.log("Following??", following)
  }
  let filePath
  if (photo.length === 0) {
    filePath = "uploads/default_photo.webp"
  } else {
    filePath = photo[0].photoFilePath
  }
  // console.log("My file path -------->", filePath)
  const token = generateToken(req.user_id);

  const returnUserData = {
    firstName: queryUser[0].firstName,
    lastName: queryUser[0].lastName,
    myProfile: (currentUser[0].username == queryUser[0].username),
    photoFilePath: filePath,
    following: following
  }

  res.status(200).json({ userData: returnUserData, token: token });
}




async function checkUsername(req, res) {
    const username = req.query.username;
    try {
      if (await isUnique(username)) {
        return res.status(200).json({unique: true });
      } else {
        return res.status(200).json({ unique: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({error: "Server error" });
    }
}

async function getMyUsername(req, res) {
  try {
  const currentUser = await User.find({ _id: req.user_id });
  console.log(currentUser);
  const token = generateToken(req.user_id);

  const returnUserData = {
    firstName: currentUser[0].firstName,
    lastName: currentUser[0].lastName,
    user_id: currentUser[0]._id,
    username: currentUser[0].username,
  }
  return res.json(returnUserData);
} catch {
  return res.json({username: "HELP!!!"});
}

}

async function isUnique(username) {
  const userArray = await User.find({username: username});
  return (userArray.length === 0)
}

async function follow(req, res) {
  console.log('id:'+req.user_id)
  // const currentUser = await User.find({ _id: req.user_id });
  // console.log("The array is --->", currentUser[0].following)
  // console.log("What we are trying to push:", req.body.username)
  // console.log("Did it work?? --->", currentUser[0].following.push(req.body.username))
  const token = generateToken(req.user_id);
  const otherUser = await User.findOne({ username: req.body.username })
  console.log("OTHER USER IS HERE!!!!!------>>>", otherUser, "<<<---------- OTHER USER IS HERE!!!!!")
  const updateFollowers = await User.updateOne(
    { _id: req.user_id },
    { $addToSet: { following: otherUser._id } } )
  .then((updateFollowers) => {
    console.log("Follow saved to db?");
    res.status(201).json({ following: true, token: token });
  })
  .catch((err) => {
    console.error(err);
    console.log("I was triggered, user not followed")
    res.status(400).json({ message: "Something went wrong - user not followed", token: token });
  })
}

async function unfollow(req, res) {
  const token = generateToken(req.user_id);
  const otherUser = await User.findOne({username: req.body.username })
  const updateFollowers = await User.updateOne(
    { _id: req.user_id },
    { $pull: { following: otherUser._id } } )
  .then((updateFollowers) => {
    console.log("Follow removed to db?");
    res.status(201).json({ following: false, token: token });
  })
  .catch((err) => {
    console.error(err);
    console.log("I was triggered, user not followed")
    res.status(400).json({ message: "Something went wrong - user not followed", token: token });
  })
}

const UsersController = {
  create: create,
  getUserProfile: getUserProfile,
  checkUsername: checkUsername,
  getAnyUserProfile: getAnyUserProfile,
  getMyUsername: getMyUsername,
  getUsers: getUsers,
  follow: follow,
  unfollow: unfollow,
};

module.exports = UsersController;
