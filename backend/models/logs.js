import mongoose from "mongoose";
import {Schema, model} from "mongoose";

const LogsSchema = new Schema({
    time:{
        type:String,
        required:true
    },
    username:{
        type:String,
    },
    event:{
        type: String,
        required:true
    },
    message:{
        type:String
    }
})

export default mongoose.model("Logs", LogsSchema)