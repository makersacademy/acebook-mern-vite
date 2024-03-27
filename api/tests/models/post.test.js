require("../mongodb_helper");

const Post = require("../../models/post");

//describe("Post model", () => {
  //beforeEach(async () => {
    //await Post.deleteMany({});
  //});
//});

  it("has a message", () => {
    const post = new Post({
    username:'Ben',
    message: 'update model post',
    liked: true,
    likeCounter: 1 });
    expect(post.message).toEqual('update model post');
    expect(post.username).toEqual('Ben');
    expect(post.liked).toEqual(true);
    expect(post.likeCounter).toEqual(1);
  });

  //it("can list all posts", async () => {
    //const posts = await Post.find();
    //expect(posts).toEqual([]);
  //});

  it("can save a post", async () => {
    const post = new Post({username:'Ben',
    message: 'update model post',
    liked: true,
    likeCounter: 1});
    await post.save();
    const posts = await Post.find();
    expect(posts[0].message).toEqual('update model post');
    expect(posts[0].username).toEqual('Ben');
  });
