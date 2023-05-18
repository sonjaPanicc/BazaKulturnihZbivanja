import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/user.js";

const jwtSecret = process.env.JWT_SECRET || "jdhasdhasdjhasdj";

export const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const oldUser = await User.findOne({ email });

        if (!oldUser) {
            return res.status(404).json({ message: "User doesn't exist" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, jwtSecret, { algorithm: "HS256", expiresIn: "5d" });

        res.status(200).json({ result: oldUser, token });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
};

export const register = async (req, res) => {

    const { email, password, firstName, lastName } = req.body;

    try {
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({
            email: email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`,
        });

        const token = jwt.sign({ email: result.email, id: result._id }, jwtSecret, { algorithm: "HS256", expiresIn: "5d" });

        res.status(201).json({ result, token });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
};

export const getAllMembers = async (req, res) => {

    try {
        const members = await User.find();
        res.status(200).json(members);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};
