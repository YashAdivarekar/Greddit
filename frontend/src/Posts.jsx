import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ReportIcon from "@mui/icons-material/Report";
import CommentIcon from "@mui/icons-material/Comment";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Button from "@mui/material/Button";

export const PostCard = (props) => {
  // console.log(props);
  const [commentText, setCommentText] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);

  const [reportText, setReportText] = useState("");
  const [showReportBox, setShowReportBox] = useState(false);

  const [comments, setComments] = useState([]);

  const getComments = async () => {
    try {
      const resp = await axios.post(
        "http://localhost:8000/api/getallcomments",
        {
          id: props.props._id,
        }
      );
      setComments(resp.data);
      // console.log(comments);
      // console.log(resp.)
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    getComments();
  }, []);

  const handleUpvote = async () => {
    // logic for upvoting the post
    const res = await axios.post("http://localhost:8000/api/upvotes", {
      id: props.props._id,
    });
  };

  const handleDownvote = async () => {
    // logic for downvoting the post
    const res = await axios.post("http://localhost:8000/api/downvotes", {
      id: props.props._id,
    });
  };

  const handlefollow = async (event) => {
    //logic for follow
    // event.preventDefault();
    if (localStorage.getItem("email") === props.props.postedby) {
      alert("You cannot follow yourself");

      window.location.reload();
    } else {
      const res = await axios.post("http://localhost:8000/api/follow", {
        followermail: localStorage.getItem("email"),
        followingmail: props.props.postedby,
      });
      console.log("response",res)
      if (res.data == 1) {
        alert("Already following");

        window.location.reload();
      } else {
        const res = await axios.post("http://localhost:8000/api/followsave", {
        followermail: localStorage.getItem("email"),
        followingmail: props.props.postedby,
      });
        alert("Following");

        window.location.reload();
      }
    }
  };

  
  const handlesave = async (event) => {
    //logic for save
    // event.preventDefault();
    // logic for submitting the comment
    // console.log("reached function call")
    const res = await axios.post("http://localhost:8000/api/savepost", {
      postername:props.props.postername,
    postedby:props.props.postedby,
    postedin:props.props.postedin,
    postedinid:props.props.postedinid,
    text:props.props.text,
    upvotes:props.props.upvotes,
    downvotes:props.props.downvotes,
    email:localStorage.getItem("email"),
    postid:props.props._id
    });
    if(res.data==1)
    {
      alert("Post Saved")
      window.location.reload();
    }
    else
    {
      alert("Post already saved")
      window.location.reload();
    }
  };

  const handleReport = () => {
    setShowReportBox(true);
  };

  const handleReportSubmit =async (event) => {
    // event.preventDefault();
    // logic for submitting the report
    const res = await axios.post("http://localhost:8000/api/savereport", {
      postid:props.props._id,
    subgname:props.props.postedin,
    description:reportText,
    reporter:localStorage.getItem("email"),
    reported:props.props.postedby,
    postedinid:props.props.postedinid
    });
    if(res.data==1)
    {
      alert("Report Saved")
      window.location.reload();
    }
    else
    {
      alert("Error in saving")
      window.location.reload();
    }
    setShowReportBox(false);
    setReportText("");
  };

  const handleComment = () => {
    setShowCommentBox(true);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    // logic for submitting the comment
    const res = await axios.post("http://localhost:8000/api/savecomment", {
      postedby: localStorage.getItem("username"),
      postedbymail: localStorage.getItem("email"),
      postid: props.props._id,
      postedinid: props.props.postedinid,
      text: commentText,
    });
    if(res.data==1)
    {
      alert("Report Saved")
      window.location.reload();
    }
    else
    {
      alert("Error in saving")
      window.location.reload();
    }
    setShowCommentBox(false);
    setCommentText("");
  };

  return (
    <Card
      style={{
        maxWidth: 600,
        width: 4000,
        margin: "auto",
        marginBottom: 16,
        backgroundColor: "#f5f5f5",
        boxShadow: "none",
        border: "1px solid #ccc",
      }}
    >
      <CardContent>
        <Button
          color="inherit"
          onClick={() => {
            handlesave();
          }}
        >
          Save
        </Button>

        <Button
          color="inherit"
          onClick={() => {
            handlefollow();
          }}
        >
          Follow
        </Button>
        <Typography variant="h5" component="h2">
          Posted by:{props.props.postername}
        </Typography>
        <Typography variant="h5" component="h2">
          Posted in:{props.props.postedin}
        </Typography>
        <Typography variant="h5" component="h2">
          {props.props.text}
        </Typography>
        {showReportBox && (
          <form onSubmit={handleReportSubmit}>
            <TextField
              label="Report"
              placeholder="Enter your report here"
              fullWidth
              value={reportText}
              onChange={(event) => setReportText(event.target.value)}
              margin="normal"
            />

            <button type="submit">Submit Report</button>
          </form>
        )}
        {showCommentBox && (
          <form onSubmit={handleCommentSubmit}>
            <TextField
              label="Comment"
              placeholder="Enter your comment here"
              fullWidth
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
              margin="normal"
            />
            <button type="submit">Submit Comment</button>
          </form>
        )}
      </CardContent>
      <CardActions
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton onClick={handleUpvote}>
          <ThumbUpIcon style={{ marginRight: 8 }} />
        </IconButton>
        <Typography style={{ marginRight: 8 }}>
          Upvotes:{props.props.upvotes}
        </Typography>
        <IconButton onClick={handleDownvote}>
          <ThumbDownIcon style={{ marginRight: 8 }} />
        </IconButton>
        <Typography style={{ marginRight: 8 }}>
          Downvotes:{props.props.downvotes}
        </Typography>
        <IconButton onClick={handleReport}>
          <ReportIcon style={{ marginRight: 8 }} />
        </IconButton>
        <IconButton onClick={handleComment}>
          <CommentIcon style={{ marginRight: 8 }} />
        </IconButton>
      </CardActions>
      <Typography variant="h5" component="h2">
        Comments:
      </Typography>
      {comments.map((index) => (
        <>
          <Typography variant="h5" component="h2">
            Posted by:{index.postedby}
          </Typography>
          <Typography variant="h5" component="h2">
            {index.text}
          </Typography>
        </>
      ))}
    </Card>
  );
};

// export const SavedPostCard = (props) => {
//   console.log(props);

//   const [posts, setPosts] = useState([]);

//   const findposts = async (index) => {
//     console.log("index=", index);
//     try {
//       const resp = await axios.post(
//         "http://localhost:8000/api/getsavedpostsval",
//         {
//           id: props.props.postid,
//         }
//       );
//       setPosts(resp.data);
//       console.log("postval",resp.data);
//     } catch (error) {
//       console.log("error");
//     }
//   };
//   useEffect(() => {
//     findposts();
//   }, []);

 
//   return (
//     <PostCard props={posts}/>
//   );
// };

export default PostCard;
