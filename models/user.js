const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3,
        maxLength: 20
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 40
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

UserSchema.pre('save', function (next) {
    const user = this;
    if (user.isNew || user.isModified('password')) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                return next();
            })
        }) 
    } else {
        return next();
    }
})
module.exports = mongoose.model('user', UserSchema);