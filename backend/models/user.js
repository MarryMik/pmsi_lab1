import mongoose from "mongoose";
import {Schema, model} from "mongoose";

const UserSchema=new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    restriction:{
        type: Boolean,
        required: true
    }
})

export default mongoose.model("User", UserSchema)