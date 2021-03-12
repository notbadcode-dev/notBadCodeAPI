import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const PaletteSchema = new Schema({
    title: {
        type: String,
        trim: true,
        default: '',
    },
    colours: {
        type: [String],
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    tags: {
        type: [String],
    },
    isFamous: {
        type: Boolean,
        default: false,
    },
    isPendingApproval: {
        type: Boolean,
        default: false,
    }
}, {
    versionKey: false,
    timestamps: true,
    collection: 'colours',
});

PaletteSchema.plugin(mongoosePaginate);
export default model('Colours', PaletteSchema)