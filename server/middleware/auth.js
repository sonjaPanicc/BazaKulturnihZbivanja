import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET || "jdhasdhasdjhasdj";

const auth = async (req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1];
        let decodedData;

        if (token) {
            decodedData = jwt.verify(token, jwtSecret);
            req.userId = decodedData?.id;
        } else {
            return res.status(403).json({ "message": "No token issued" });
        }
        next();

    } catch (error) {
        console.log(error);
    }
};

export default auth;
