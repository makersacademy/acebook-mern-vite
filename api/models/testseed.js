const mongoose = require("mongoose");
const User = require("./user")
const Post = require("./post")
const Comment = require("./comment")
const Relationship = require("./relationship")


// const Comment = mongoose.model('Comment', comment.CommentSchema);
// const Relationship = mongoose.model('Relationship', relationship.RelationshipSchema);

mongoose.connect('mongodb://0.0.0.0/acebook_test', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Insert the seed data into the test database
db.once('open', async () => {
    try {
        // Clear existing data (optional)
        await User.deleteMany({});
        
        // Insert the seed data for each model

    //Insering users
        const users = [
            {
                email: 'user1@example.com',
                password: 'password1',
                forename: 'John',
                surname: 'Doe',
                username: 'john_doe',
                dob: new Date('1990-01-01'),
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                location: 'New York'
            },
            {
                email: 'user2@example.com',
                password: 'password2',
                forename: 'Alice',
                surname: 'Smith',
                username: 'alice_smith',
                dob: new Date('1985-05-15'),
                description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
                location: 'Los Angeles'
            },
        
            {
                email: 'user3@example.com',
                password: 'password3',
                forename: 'Michael',
                surname: 'Johnson',
                username: 'michael_johnson',
                dob: new Date('1988-09-21'),
                description: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed ut eros.',
                location: 'Chicago'
            },
            {
                email: 'user4@example.com',
                password: 'password4',
                forename: 'Emily',
                surname: 'Brown',
                username: 'emily_brown',
                dob: new Date('1992-03-10'),
                description: 'Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.',
                location: 'Houston'
            },
            {
                email: 'user5@example.com',
                password: 'password5',
                forename: 'William',
                surname: 'Jones',
                username: 'william_jones',
                dob: new Date('1987-07-08'),
                description: 'Duis ac turpis. Integer rutrum ante eu lacus. Vestibulum libero nisl, porta vel, scelerisque eget, malesuada at, neque.',
                location: 'Philadelphia'
            },
            // Add more users as needed
        ];
            
        const insertusers = await User.insertMany(users);

    //Inserting posts 

        const posts = [
            {
                message: 'This is the first post!',
                user: insertusers[0]._id, // Reference to the ObjectId of the first user
                likes: 5,
                createdDate: new Date(),
                modifiedDate: new Date()
            },
            {
                message: 'Another post from a different user.',
                user: insertusers[1]._id, // Reference to the ObjectId of the second user
                likes: 3,
                createdDate: new Date(),
                modifiedDate: new Date()
            },

            {
                message: 'i dont know',
                user: insertusers[4]._id, // Reference to the ObjectId of the first user
                likes: 6,
                createdDate: new Date(),
                modifiedDate: new Date()
            },
            {
                message: 'No one likes my content',
                user: insertusers[3]._id, // Reference to the ObjectId of the second user
                likes: 0,
                createdDate: new Date(),
                modifiedDate: new Date()
            },
                // Add more posts as needed
        ];
        const insertposts = await Post.insertMany(posts);

    //inserting comments and relationships 

        const comments = [
            {
                message: 'This is a great post!',
                user: insertusers[0]._id, // Reference to the ObjectId of the first user
                post: insertposts[2]._id, // Reference to the ObjectId of the first post
                likes: 10,
                createdDate: new Date(),
                modifiedDate: new Date()
            },
            {
                message: 'Nice work!',
                user: insertusers[1]._id, // Reference to the ObjectId of the second user
                post: insertposts[0]._id, // Reference to the ObjectId of the second post
                likes: 5,
                createdDate: new Date(),
                modifiedDate: new Date()
            },

            {
                message: 'hello',
                user: insertusers[3]._id, // Reference to the ObjectId of the first user
                post: insertposts[3]._id, // Reference to the ObjectId of the first post
                likes: 10,
                createdDate: new Date(),
                modifiedDate: new Date()
            },
            {
                message: 'my comment will get more likes than this post',
                user: insertusers[1]._id, // Reference to the ObjectId of the second user
                post: insertposts[3]._id, // Reference to the ObjectId of the second post
                likes: 12,
                createdDate: new Date(),
                modifiedDate: new Date()
            },
                // Add more comments as needed
        ];

        const relationships = [
            {
                status: 'pending',
                fromUser: insertusers[0]._id, // Reference to the ObjectId of the first user
                toUser: insertusers[1]._id // Reference to the ObjectId of the second user
            },
            {
                status: 'confirmed',
                fromUser: insertusers[1]._id, // Reference to the ObjectId of the second user
                toUser: insertusers[2]._id // Reference to the ObjectId of the third user
            },
            {
                status: 'blocked_to',
                fromUser: insertusers[2]._id, // Reference to the ObjectId of the third user
                toUser: insertusers[3]._id // Reference to the ObjectId of the fourth user
            },
            {
                status: 'blocked_from',
                fromUser: insertusers[3]._id, // Reference to the ObjectId of the fourth user
                toUser: insertusers[2]._id // Reference to the ObjectId of the fifth user
            },
            {
                status: 'blocked_both',
                fromUser: insertusers[4]._id, // Reference to the ObjectId of the fifth user
                toUser: insertusers[3]._id // Reference to the ObjectId of the sixth user
            },
            {
                status: 'confirmed',
                fromUser: insertusers[3]._id, // Reference to the ObjectId of the sixth user
                toUser: insertusers[0]._id // Reference to the ObjectId of the first user
            }
        ];

        const insertcomments = await Comment.insertMany(comments);
        const insertrelationships = await Relationship.insertMany(relationships)

        console.log(insertusers)
        console.log(insertposts)
        console.log(insertcomments)
        console.log(insertrelationships)
        
        console.log('Seed data inserted successfully');

        // Close the database connection
        db.close();
    } catch (error) {
        console.error('Error inserting seed data:', error);
        // Close the database connection
        db.close();
    }
});