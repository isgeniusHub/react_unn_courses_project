import mongoose from "mongoose";
import v4 from "uuid";

const schema = new mongoose.Schema(
    {
        articleId: {
            type: String,
            required: true,
            unique: true,
            default: v4,
        },
        userId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        userLikes: {
            type: Array,
            required: true,
            default: [],
        }
    },
    {
        timestamps: true
    }
);

export default schema;