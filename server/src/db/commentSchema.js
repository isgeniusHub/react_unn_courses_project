import mongoose from "mongoose";
import v4 from "uuid";

const schema = new mongoose.Schema(
    {
        commentId: {
            type: String,
            required: true,
            unique: true,
            default: v4,
        },
        userId: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
        articleId: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

export default schema;