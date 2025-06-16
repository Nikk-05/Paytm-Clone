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
    const body = req.body
    const validatedData = signupInputValidation.safeParse(req.body)
    if (!validatedData.success) {
        return res.json({
            message: "Email already taken/Incorrect input"
        })
    }

    const existingUser = User.findOne({
        username: body.username
    })
    if (existingUser._id) {
        return res.json({
            message: "Email already present. Please SignIn"
        })
    }

    const newUser = await User.create(body)
    const balance = Math.floor(Math.random() * 1000) + 1
    await Account.create({
        userId: newUser._id,
        balance: balance
    })

    return res.status(200).json({
        message: "User created successfully"
    })
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
            data: updatedUser
        })
    }
    catch (error) {
        res.status(411).json({
            message: "Something went wrong, during update" + error.message
        })
    }
}

const usersList = async (req, res, next) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [{
            firstName: {
                $regex: filter
            }
        }, {
            lastName: {
                $regex: filter
            }
        }]
    })
    res.status(200).json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
}




export { userSignIn, userSignUp, userUpdate, usersList}