import mongoose,{ Schema } from 'mongoose'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
dotenv.config({ path: './.env' })

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        toLowerCase: true
    },
    firstName: {
        type: String,
        require: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        require: true,
        maxLength: 50,
        trim: true
    },
    password: {
        type: String,
        maxLength: 12,
        require: true
    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

userSchema.methods.isPasswordValid = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateJWTToken = function () {
    return jwt.sign({
        _id: this._id,
        username: this.username
    },
        JWT_SECRET_KEY,
        { expiresIn: '2D' }
    )
}

const User = mongoose.model('User', userSchema)

export default User

