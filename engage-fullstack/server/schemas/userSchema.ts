import mongoose, { Mongoose } from 'mongoose';

const sectionIdValidator = function(v: string) {
    return /^\d{4}$/.test(v);
}

const userSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    did: {
        type: String,
        lowercase: true,
        required: true
    },
    reason: {
        type: String,
        lowercase: true
    },
    name: String,
    authority: {
        type: String,
        enum: ["STUDENT", "ADMIN"],
        required: true
    },
    sections: String,
    courses: String,
    lectures: String
});

const UserModel = mongoose.model('User', userSchema);
export {UserModel, sectionIdValidator}