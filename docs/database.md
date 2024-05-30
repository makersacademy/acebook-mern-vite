
### /api/db
This directory contains functions related to interaction with the database. It currently contains one file, which connects to the database based off of the `MONGODB_URL` environment variable (found at:  /api/.env).

Some useful links:
 - [Download Compass GUI (the counterpart to TablePlus)](https://www.mongodb.com/try/download/compass)
 - [Side by side comparison to SQL](https://www.mongodb.com/docs/manual/reference/sql-comparison/)
 - [Guide to writing queries with SQL comparisons](https://www.mongodb.com/docs/manual/tutorial/query-documents/)
    e.g.: " db.posts.find({ _id: token._id}) " is like " SELECT * FROM posts WHERE _id = token._id; "
 - [Guide for CRUD operations](https://www.mongodb.com/docs/manual/crud/)

WIP
