import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    name: { type: String },
    email: { type: String },
    password: { type: String },
    id: { type: String }
    
});

const User = mongoose.model("User", userSchema);

export default User;
