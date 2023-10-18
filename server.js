const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();
mongoose.Promise = global.Promise;

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'db-contacts',
  }
);

connection
    .then(() => {
        console.log("Database connection successful");
        app.listen(PORT, () => {
            console.log(`App listens on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error(`Error while establishing connection: [${error}]`);
        process.exit(1);
    });
