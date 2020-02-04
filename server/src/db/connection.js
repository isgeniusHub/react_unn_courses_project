import userSchema from "./userSchema.js";
import articleSchema from "./articleSchema.js";
import commentSchema from "./commentSchema.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import * as path from 'path';

dotenv.config({
    path: path.join(path.resolve(),"./.env")
});

const hostPort = `${process.env.DB_HOST || "172.17.0.1"}:${process.env.DB_PORT || 27017}`;
mongoose.connect(`mongodb://${hostPort}/react_db`, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error: "));
db.once('open',function () {
    console.log("Successful connection to Mongo");
})

const user = mongoose.model("user", userSchema);
const article = mongoose.model("article", articleSchema);
const comment = mongoose.model("comment", commentSchema);

export default {
    user,
    article,
    comment,
};