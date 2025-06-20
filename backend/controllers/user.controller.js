import { z } from 'zod'
import User from '../models/User.models.js'
import Account from '../models/Accounts.models.js'

const signupInputValidation = z.object({
    username: z.string().email(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string()
})

const updateSchema = z.object({
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional()
})

const userSignUp = async (req, res) => {
    try {
        const body = req.body
        const validatedData = signupInputValidation.safeParse(req.body)
        if (!validatedData.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: validatedData.error.errors
            })
        }

        const existingUser = await User.findOne({
            username: body.username
        })
        if (existingUser._id) {
            return res.status(403).json({
                message: "Email already present. Please SignIn"
            })
        }

        const newUser = await User.create(body)
        const balance = Math.floor(Math.random() * 1000) + 1
        await Account.create({
            userId: newUser._id,
            balance: balance
        })
        const token = newUser.generateJWTToken()
        return res.status(200).json({
            access_token: token,
            message: "User created successfully"
        })
    }
    catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

const userSignIn = async (req, res) => {
    const { username, password } = req.body
    const loggedInUser = await User.findOne({
        username: username
    })
    if (!loggedInUser || !(await loggedInUser.isPasswordValid(password))) {
        return res.status(403).json({
            message: "Username or Password is incorrect"
        })
    }

    const token = loggedInUser.generateJWTToken()
    return res.status(200).json({
        message: "User logged in successfully",
        access_token: token
    })
}

const userUpdate = async (req, res, next) => {
    const { success } = updateSchema.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: 'Error while updating information'
        })
    }
    try {
        const updatedUser = await User.findOneAndUpdate({
            _id: req.userId
        },
            req.body,
            { new: true }
        ).select('-password')

        return res.status(200).json({
            message: "User data updated",
            user: updatedUser
        })
    }
    catch (error) {
        res.status(411).json({
            message: "Something went wrong, during update" + error.message
        })
    }
}

const usersList = async (req, res, next) => {
    const filter = req.query.filter
    let users;
    if (!filter) {
        users = await User.find({
            _id: { $ne: req.userId }
        })
    }
    else {
        users = await User.find({
            _id: { $ne: req.userId },
            $or: [{
                firstName: {
                    $regex: filter,
                    $options: 'i' //case-insensitive
                }
            }, {
                lastName: {
                    $regex: filter,
                    $options: 'i' //case-insensitive
                }
            }]
        })
    }
    res.status(200).json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
}

const userSignOut = async (req, res) => {
    return res.status(200).json({
        message: "User signed out successfully"
    });
};

export { userSignIn, userSignUp, userUpdate, usersList, userSignOut }