import mongoose from "mongoose";
import {Schema, model} from "mongoose";

const RegistersSchema = new Schema({
    time:{
        type:String,
        required:true
    },
    username:{
        type:String
    },
    event:{
        type:String,
        require: true
    },
    message:{
        type:String
    }
})

export default mongoose.model("Registers", RegistersSchema)