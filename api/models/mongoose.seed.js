const mongoose = require('mongoose');
const User = require("./user") // Assuming User model is defined in a separate file
const Post = require('./post')
const Comment = require('./comment')
const { connectToDatabase } = require("../db/db");
const { sub } = require('date-fns');
require("dotenv").config();

const seedDatabase = async () => {
    try {
        // Connect to the database
        await connectToDatabase();
        const createNewUsers = async () => {
      // Delete existing users        
            await User.deleteMany({});
        // Create new users
            await User.create([
            {
                email: 'test@test.com',
                password: 'Password12!',
                firstName: 'Testing-FirstName',
                lastName: 'Testing-Surname',
                bio: 'Why hey here is my bio',
                image: 'profiles/xsqsvdilme7ypdn4khsb'
                },
            {
                email: 'amy.brown@spektrix.com',
                password: 'Password12!',
                firstName: 'Amy',
                lastName: 'Brown',
                bio: 'Why hey here is my bio',
                image: 'profiles/xsqsvdilme7ypdn4khsb'
            },
            {
                email: 'jane@test.com',
                password: 'Password12!',
                firstName: 'Jane',
                lastName: 'Eyre',
                bio: "I am no bird; and no net ensnares me: I am a free human being with an independent will.",
                image: 'profiles/zwwsyp7ytizrlsjzk6l8'
            },
            {
                email: 'alice@test.com',
                password: 'Password12!',
                firstName: 'Alice',
                lastName: 'Wonderland',
                bio: "Curiouser and curiouser!",
                image: 'profiles/zwwsyp7ytizrlsjzk6l8'
            },
            // Add more users as needed
            ]);
        console.log('Users inserted successfully');
        }
        const createNewPosts = async () => {
            const testTestingUser = await User.findOne({ email: 'test@test.com' });
            const amyUser = await User.findOne({ email: 'amy.brown@spektrix.com' });
            const janeUser = await User.findOne({ email: 'jane@test.com' });
            const aliceUser = await User.findOne({ email: 'alice@test.com' });
            const dateNow  = new Date();
            await Post.deleteMany({});
            await Post.create([
                {
                    message: "This is Test Testingson",
                    owner_id: testTestingUser._id,
                    user: testTestingUser
                },
                {
                    message: "This is Alice",
                    owner_id: aliceUser._id,
                    user: aliceUser,
                    post_date: sub(dateNow, {minutes: 10})
                },
                {
                    message: "This is Jane again",
                    owner_id: janeUser._id,
                    user: janeUser,
                    post_date: sub(dateNow, {minutes: 90})
                },
                {
                    message: "This is Test Testingson the 2nd",
                    owner_id: amyUser._id,
                    user: amyUser,
                    post_date: new Date('2024-04-02T09:40:18.010Z')
                },
                {
                    message: "This is Jane",
                    owner_id: janeUser._id,
                    user: janeUser,
                    post_date: new Date('2024-04-01T10:40:18.010Z')
                },
            ]);
            console.log('Posts inserted successfully');
        }
        const createNewComments = async () => {
            const testTestingUser = await User.findOne({ email: 'test@test.com' });
            const amyUser = await User.findOne({ email: 'amy.brown@spektrix.com' });
            const janeUser = await User.findOne({ email: 'jane@test.com' });
            const aliceUser = await User.findOne({ email: 'alice@test.com' });
            const posts = await Post.find()
            const firstPost = await posts [0]
            const secondPost = await posts [1]
            const thirdPost = await posts [2]
            const fourthPost = await posts [3] 
            const dateNow  = new Date();                
            await Comment.deleteMany({});
            await Comment.create([
                {
                    postId: firstPost._id,
                    message: "This a reply to mr testingson",
                    owner_id: janeUser._id,
                    user: janeUser,
                    createdAt: sub(dateNow, {minutes: 10})
                },
                {
                    postId: secondPost._id,
                    message: "I think you are marvellous",
                    owner_id: janeUser._id,
                    user: janeUser
                },
                {
                    postId: secondPost._id,
                    message: "So do I!",
                    owner_id: janeUser._id,
                    user: janeUser
                },
                {
                    postId: thirdPost._id,
                    message: "Oh do take me out for tea sometime",
                    owner_id: janeUser._id,
                    user: janeUser
                },
            ]);
            console.log('Comments inserted successfully');
        }
    await createNewUsers()
    await createNewPosts()
    await createNewComments()
    } catch (error) {
      console.error('Error seeding:', error);
    } finally {
      // Close the database connection
      await mongoose.connection.close(true);
    }
  };

  seedDatabase();