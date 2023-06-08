import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
    postid:{
        type:String,
        required:true
    },
    subgname:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    reporter:{
        type:String
    },
    reported:{
        type:String
    },
    postedinid:
    {
        type:String
    }
})

const Report=mongoose.model("Report",ReportSchema);

export default Report;

