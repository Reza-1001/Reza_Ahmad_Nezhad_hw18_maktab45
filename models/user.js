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
    if (user.isModified('password')) {
        console.log(111);
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
UserSchema.pre('updateOne', function (next) {
    const password = this._update.$set.password;
    if(!password)
    return next();
        console.log(333);
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);
        this._update.$set.password=hash;
    return next();
})
module.exports = mongoose.model('user', UserSchema);