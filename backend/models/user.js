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
    },
    type: {
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        required: true
    },
    restriction:{
        type: Boolean,
        required: true
    },
    question1:{
        type: String
    },
    question2:{
        type: String
    },
    question3:{
        type: String
    },
    question4:{
        type: String
    },
    question5:{
        type: String
    },
    question6:{
        type: String
    },
    question7:{
        type: String
    },
    question8:{
        type: String
    },
    question9:{
        type: String
    },
    question10:{
        type: String
    },
    question11:{
        type: String
    },
    question12:{
        type: String
    },
    question13:{
        type: String
    },
    question14:{
        type: String
    },
    question15:{
        type: String
    }
})

export default mongoose.model("User", UserSchema)