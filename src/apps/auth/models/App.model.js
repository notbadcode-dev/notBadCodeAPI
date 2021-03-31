import { Schema, model } from "mongoose";

const appSchema = new Schema({
    id: {
        type: Number,
        unique: true,
    },
    name: {
        type: String,
        trim: true,
        unique: true,
    }
}, {
    versionKey: false,
    timestamps: true,
    collection: 'apps',
});

export default model('App', appSchema)