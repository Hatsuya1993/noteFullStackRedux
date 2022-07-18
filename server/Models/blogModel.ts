import { Schema, model } from "mongoose";
import { BlogInterface } from "../Interface/blogInterface";

const blogSchema = new Schema<BlogInterface>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    kind: {
        type: String,
        enum: ['travel', 'food', 'attractions', 'beauty'],
        required: true,
    },
    user: {
        type: String,
        required: true
    }
})

export const Blog = model<BlogInterface>('Blog', blogSchema)