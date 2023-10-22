const mongoose = require("mongoose");
const app = require("./app");
const path = require('path');
require("dotenv").config();
const createFolderIfNotExist = require("./middlewares/multer");
mongoose.Promise = global.Promise;

const publicPath = path.join(process.cwd(), "public");
const uploadDir = path.join(process.cwd(), "public/tmp");
const storeImage = path.join(process.cwd(), "public/avatars");

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'db-contacts',
});

connection
    .then(() => {
        console.log("Database connection successful");
        app.listen(PORT, () => {
            createFolderIfNotExist(publicPath);
            createFolderIfNotExist(uploadDir);
            createFolderIfNotExist(storeImage);
            console.log(`App listens on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error(`Error while establishing connection: [${error}]`);
        process.exit(1);
    });
