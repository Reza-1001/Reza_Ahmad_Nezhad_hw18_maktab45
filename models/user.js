const mongoose = require('mongoose');
const Schema = mongoose.Shcema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true;
        trim: true;
        minLength: 3,
        maxLength: 20
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 40
    },
    createdAt: {
        type: date,
        default: Date.now
    }
})

module.exports = mongoose.model(UserSchema); 