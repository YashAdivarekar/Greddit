import mongoose from "mongoose";

const SavedSchema = new mongoose.Schema({
    postername:{
        type:String
    },
    postedby:{
        type:String
    },
    postedin:{
        type:String
    },
    postedinid:{
        type:String
    },
    text:{
        type:String
    },
    upvotes:{
        type:Number
    },
    downvotes:{
        type:Number
    },
    email:{
        type:String
    },
    postid:{
        type:String
    }
})

const Saved=mongoose.model("Saved",SavedSchema);

export default Saved;

