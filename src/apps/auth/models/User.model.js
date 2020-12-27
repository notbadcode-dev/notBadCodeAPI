import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    lastConecction: {
        type: Date,
        default: null
    }
}, {
    versionKey: false,
    timestamps: true,
    collection: 'users',
});

// userSchema.pre('save', function(next) {
//     this.lastConecction = Date.now()
//     next()
// })

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};
  
userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

export default model('User', userSchema)