const mongoose = require("mongoose");

const connectToDatabase = async () => {
  // const mongoDbUrl = process.env.MONGODB_URL;

  // if (!mongoDbUrl) {
  //   console.error(
  //     "No MongoDB url provided. Make sure there is a MONGODB_URL environment variable set. See the README for more details."
  //   );
  //   throw new Error("No connection string provided");
  // }

  // await mongoose.connect(mongoDbUrl);

  // if (process.env.NODE_ENV !== "test") {
  //   console.log("Successfully connected to MongoDB");
  // }

  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@kwizical.xpmi3dw.mongodb.net/?retryWrites=true&w=majority&appName=kwizical`;
  const clientOptions = {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
  };

  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch {
    console.dir
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
};

module.exports = { connectToDatabase };

// const mongoose = require("mongoose");
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@kwizical.xpmi3dw.mongodb.net/?retryWrites=true&w=majority&appName=kwizical`;
// const clientOptions = {
//   serverApi: { version: "1", strict: true, deprecationErrors: true },
// };
// async function run() {
//   try {
//     // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
//     await mongoose.connect(uri, clientOptions);
//     await mongoose.connection.db.admin().command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await mongoose.disconnect();
//   }
// }
// run().catch(console.dir);
