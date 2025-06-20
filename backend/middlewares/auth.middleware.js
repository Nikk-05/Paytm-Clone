import jwt from 'jsonwebtoken'

const authUser = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "invalid access token" })
    }
    const token = authHeader.split(' ')[1]

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.userId = decode._id
        next();
    }
    catch (error) {
        return res.status(403).json({
            message: "Not Authorized access"
        })
    }
}
export default authUser;