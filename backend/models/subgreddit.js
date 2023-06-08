import mongoose from "mongoose";

const SubgredditSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tags:{
        type:String,
    },
    Bannedwords:{
        type:String
    },
    blocked:{
        type:Array
    },
    unblocked:{
        type:Array
    },
    joinreq:{
        type:Array
    },
    modname:{
        type:String
    },
    modmail:{
        type:String
    },
    followers:{
        type:Number
    },
    posts:{
        type:Array
    },
    left:{
        type:Array
    }
})

const Subgreddit=mongoose.model("SubGreddit",SubgredditSchema);

export default Subgreddit;