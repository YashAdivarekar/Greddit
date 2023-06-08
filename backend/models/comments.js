import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    postedby:{
        type:String
    },
    postedbymail:{
        type:String
    },
    postid:{
        type:String
    },
    postedinid:{
        type:String
    },
    text:{
        type:String
    }
})

const Comment=mongoose.model("Comment",CommentSchema);

export default Comment;