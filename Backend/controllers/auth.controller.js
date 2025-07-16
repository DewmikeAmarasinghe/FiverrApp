import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const register = async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            ...req.body,
            password: hash,
        });

        await newUser.save();
        res.status(201).send("User has been created.");
    } catch (err) {
        console.error("Registration error:", err);
        next(createError(500, "Failed to register user"));
    }
};

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "User not found"));

        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isCorrect) {
            return next(createError(400, "Wrong username or password"));
        }

        const token = jwt.sign(
            {
                id: user._id,
                isSeller: user.isSeller,
            },
            process.env.JWT_KEY,
            { expiresIn: "1d" }
        );

        const { password, ...info } = user._doc;

        res
            .cookie("accessToken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000,
            })
            .status(200)
            .send(info);
    } catch (err) {
        console.error("Login error:", err);
        next(createError(500, "Failed to log in"));
    }
};

export const logout = async (req, res, next) => {
    try {
        res
            .clearCookie("accessToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            })
            .status(200)
            .send("User has been logged out.");
    } catch (err) {
        console.error("Logout error:", err);
        next(createError(500, "Failed to log out"));
    }
};
