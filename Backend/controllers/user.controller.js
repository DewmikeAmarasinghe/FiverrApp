import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';

export const deleteUser = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).send("You are not authorized");

    try {
        const payload = jwt.verify(token, process.env.JWT_KEY);

        if (payload.id !== req.params.id) {
            return res.status(403).send("You can only delete your own account");
        }

        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).send("User not found")
        }
        return res.status(200).send("User deleted successfully");
    } catch (error) {
        console.error(error);
        return res.status(403).send("Token is invalid or expired");
    }
};
export const getUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);

    res.status(200).send(user);
};