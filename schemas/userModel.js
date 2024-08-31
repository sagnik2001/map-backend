const { mongoose } = require("mongoose");

const UserModel = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: [true, 'Email address is required'],
        unique: true
    },
    userEmailId: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    userProfilePicture: {
        type: String
    }
});

const User = mongoose.model('User', UserModel);
module.exports = User;