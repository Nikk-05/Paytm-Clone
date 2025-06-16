import mongoose, { Schema } from 'mongoose'
import { string } from 'zod'

const accountSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    balance: {
        type: Number,
        require: true
    }
})

const Account = mongoose.model('Account', accountSchema)
export default Account;