import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
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
    }
})

const Post=mongoose.model("Post",PostSchema);

export default Post;