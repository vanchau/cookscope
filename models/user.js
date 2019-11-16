const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    profilePicture: {
        type: String,
        default: 'anonymous.jpg'
    },
    bookmarks: [{
        type: String
    }],
    following: [{
        type: String
    }],
    followers: [{
        type: String
    }]
})

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}

userSchema.statics.getProfileInfoByUsername = async (username) => {
    const user = await User.findOne({ username: username })
    if (!user) {
        throw new Error({ error: 'No such user' })
    }
    return {
        _id: user.id,
        username: user.username,
        profilePicture: user.profilePicture,
        following: user.following,
        followed: user.followed,
        bookmarks: user.bookmarks
    }
}

userSchema.statics.findProfilesByIds = async (ids) => {
    const users = await User.find().where('_id').in(ids)
    return users.map(u => {
        return {
            _id: u.id,
            username: u.username,
            profilePicture: u.profilePicture,
            following: u.following,
            followed: u.followed
        }
    })
}

const User = mongoose.model('User', userSchema)

module.exports = User