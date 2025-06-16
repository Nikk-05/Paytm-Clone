import Account from '../models/Accounts.models.js'
import mongoose from 'mongoose'

const getBalance = async(req, res)=>{
    try{
        
        const userAccount = await Account.findOne({
            userId: req.userId
        }) 
        res.status(200).json({
            message: `Your current balance is ₹${userAccount.balance}`
        })
    }
    catch(error){
        res.status(300).json({
            message:"Unable to fetch balance. Try again!" + error.message
        })
    }
}

const transferMoney = async (req, res) => {
    try {
        const session = await mongoose.startSession()

        session.startTransaction()
        const { receiver, amount } = req.body

        const senderAccount = await Account.findOne({
            userId: req.userId
        }).session(session)

        if (!senderAccount || senderAccount.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            })
        }

        const receiverAccount = await Account.findOne({
            userId: receiver
        }).session(session)

        if (!receiverAccount) {
            session.abortTransaction();
            return res.status(400).json({
                message: "Invalid Account"
            })
        }
        // Perform the transfer
        await Account.updateOne(
            { userId: req.userId },
            { $inc: { balance: -amount } }
        ).session(session)

        await Account.updateOne(
            { userId: receiver },
            { $inc: { balance: amount } }
        ).session(session)

        // commit the transaction
        await session.commitTransaction()
        res.status(200).json({
            message: 'Transfer successful'
        })
    }
    catch (error) {
        res.status(500).json({
            message: 'Server not working ' + error.message
        })
    }
}

// // bad Approach: In this variours issue can be happend like server failure and money is deducted from one end and didn't recieve at another end.
// const transferMoney = async (req, res) => {
//     try {
//         const { receiver, amount } = req.body
//         const senderAccount = await Account.findOne({
//             userId: req.userId
//         })
//         if (senderAccount.balance < amount) {
//             throw new Error("Insufficient Balance")
//         }

//         await Account.updateOne(
//             { userId: req.userId },
//             { $inc: { balance: -amount } }
//         )

//         const receiverAccount = await Account.findOneAndUpdate(
//             { userId: receiver },
//             { $inc: { balance: amount } },
//             { new: true }
//         )
//     }
//     catch (error) {
//         res.status(403).json({
//             message: 'Something went wrong ' + error.message
//         })
//     }
// }

export {  getBalance, transferMoney }