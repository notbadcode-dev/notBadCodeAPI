import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

import { CodeCategories, CodeFormats } from '../enums/codes.global.enums'

const codeSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    data: {
        type: String,
        required: true,
        trim: true,
    },
    format: {
        type: CodeFormats,
        required: true,
        trim: true,
    },
    category: {
        type: CodeCategories,
        required: true,
        default: CodeCategories.other,
    },
    creationMode: {
        type: String,
        required: true,
    },
    isCancelled: {
        type: Boolean,
        required: true,
    },
    isUrl: {
        type: Boolean,
        required: true,
        default: false,
    },
    isFavorite: {
        type: Boolean,
        required: true,
    },
    order: {
        type: Number,
        required: true,
    }
}, {
    versionKey: false,
    timestamps: true,
    collection: 'codes',
});

codeSchema.plugin(mongoosePaginate);
export default model('Code', codeSchema)