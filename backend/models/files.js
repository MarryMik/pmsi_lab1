import mongoose from "mongoose";
import {Schema, model} from "mongoose";

const FileSchema = new Schema({
    time:{
        type:String,
        required:true
    },
    filename:{
        type:String,
    },
    size:{
        type: String,
        required:true
    },
    username:{
        type:String
    },
    userid:{
        type:String
    }
})

export default mongoose.model("Files", FileSchema)