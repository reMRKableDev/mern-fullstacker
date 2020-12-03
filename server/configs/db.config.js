const mongoose = require("mongoose");

const { MONGO_ATLAS, MONGO_LOCAL, NODE_ENV } = process.env;

// Function to run database connection
const connectDb = (mongoUri) =>
  mongoose
    .connect(mongoUri, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then((x) => {
      console.log(
        `Connected to Mongo! Database name: "${x.connections[0].name}"`
      );
    })
    .catch((err) => {
      console.error("Error connecting to mongo", err);
    });

// Check if development environment is 
NODE_ENV === "development" ? connectDb(MONGO_LOCAL) : connectDb(MONGO_ATLAS);
