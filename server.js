const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

const connection = async () => {
  try {
    const db = await mongoose.connect(
      "mongodb+srv://zyrafa43:IclkfzYPN6P7XOgR@cluster0.tqj7dop.mongodb.net/",
      {
        dbName: "db-contacts",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("DB connected");

    app.listen(3000, () => {
      console.log(`Server runnig. Use our API on Port: ${PORT}`);
    })
  } catch (err) {
    console.log(err.message);
  }
}
connection();



//const PORT = 3000;
//const uriDb = process.env.DB_HOST;

//const connection = mongoose.connect(
  //"mongodb+srv://zyrafa43:IclkfzYPN6P7XOgR@cluster0.tqj7dop.mongodb.net/",
 // {
   // useNewUrlParser: true,
   // useUnifiedTopology: true,
   // dbName: "db-contacts",
 // }
//);

//connection
//  .then(() => {
//    app.listen(PORT, () => {
//      console.log("Database connection successful");
//      console.log(`Server running. Use our API on port: ${PORT}`);
//    });
//  })
//  .catch((err) =>
//    console.log(`Server not running. Error message: ${err.message}`)
//  );
