import mongoose from "mongoose";
import v4 from "uuid";

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        birthDate:{
            type: Date,
            required: true,
            default: new Date(),
        },
        city: {
            type: String
        },
        about: {
            type: String
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        login: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        repeatPassword: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
            unique: true,
            default: v4,
        },
        token: {
            type: String,
            required: true,
            unique: true,
            default: v4,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        }
    },
    {
        timestamps: true
    }
);

export default schema;