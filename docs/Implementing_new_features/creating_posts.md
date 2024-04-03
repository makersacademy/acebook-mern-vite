# Creating Posts
In order to allow a user to create a post we had to make quite a few changes to our infrastructure. This doc aims to break down and explain these step by step.

## The Frontend

### Creating a new page

We decided that when a user wants to create a new post they should be taken to [a page where they can do this.](/frontend/src/pages/Post/CreatePostPage.jsx) To start with we set the state of the users new post to be blank.

There is then some logic in a handleSubmit function that checks the user has not submitted a null value or a post that is too short - We've set it to 20 characters but this can easily be changed. If either of those conditions are True the user will receive an alert box telling them the issue.

If the users post is successful we call the createPosts function from [the frontend services](/frontend/src/services/posts.js) (more about this below)

*note this is different to the backend createPost controller function*

The user is then given a new token and directed back to the /posts endpoint

The file also contains a handleMessageChange function which sets the users message when they type into the input box.

You can then see how all the logic is implemented in the HTML form

### Updating the feed page

In order to access our new page we need to give the user a way to navigate there. For the moment we have set this up as a create post button the implementation and the handling logic is located in the [feed page](/frontend/src/pages/Feed/FeedPage.jsx)


### Updating the app
We need to update [our app](/frontend/src/App.jsx) to contain the newly created CreatePostsPage. We do this by importing it at the top of the document and setting a new Path and Element for it.


### Adding a New Frontend Service

We also needed to create a new [frontend service](/frontend/src/services/posts.js) to allow us to pass information to the backend. Within this new createPosts function

*note this is different to the backend createPost controller function*

we set a payload which contains the information we need to send to the backend - in this case just containing the message from the users' input. We then specify the request options: the request method, headers (which include the users token for authentication) and a body (We make our payload into JSON format here).
This information all gets sent to the route that we have set up in our backend. Our response should contain the new token that is generated in the backend - if not we will receive an error.


## The Backend
NOTE:
 There are a lot of uses of the word post below. When POST is all capitalised it is referring to the HTTP POST method! 

### Setting a Route
 In the [posts route file](/api/routes/posts.js)  we set a route for a POST request to the /posts endpoint and link this to a createPost Controller. This means when a POST request is sent from the user the data contained in that request is shared with the Controller

 ### createPost Controller

 The [createPost controller](/api/controllers/posts.js) allows us to receive information from the post request and store it in our database. When the controlller receives the POST information the data sent by the user is 'unwrapped'. Here we set 'message' to the users text input and 'user' to the users 'user_id'. This information is then passed into the Post collection (collections are the MongoDB name for a tables) in our database as a new entry. 
 
 After this we set the response, which contains a new token for the user to ensure their 'session' continues. This is necessary as after a successfully posting something we redirect the user back to the Feed Page.


