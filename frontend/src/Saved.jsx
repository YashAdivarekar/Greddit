import React, { useEffect, useState } from "react";
import axios from "axios";
import { ButtonAppBar } from "./Navbar";
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
import Button from "@mui/material/Button";

export const Saved = () => {
  const [posts, setPosts] = useState([]);

  const [saved, setSaved] = useState([]);
  const getSavedPosts = async () => {
    try {
      const resp = await axios.post("http://localhost:8000/api/getsavedposts", {
        email: localStorage.getItem("email"),
      });

      setSaved(resp.data);
      //   console.log("saved", resp.data);
      //   func();
    } catch (error) {
      console.log("error");
    }
  };

  const handleremove = async (index) => {
    const resp = await axios.post(
      "http://localhost:8000/api/deletesavedposts",
      {
        email: localStorage.getItem("email"),
        postid: index.postid,
      }
    );
    if (resp.data == 1) {
      alert("removed");

      window.location.reload();
    } else {
      alert("Could not remove");
      window.location.reload();
    }
  };

  useEffect(() => {
    getSavedPosts();
  }, []);
  return (
    <div>
      <ButtonAppBar />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div style={{ marginLeft: "5%" }}>
        {saved.map((index) => (
          <>
            <div>
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
                <Button
                  color="inherit"
                  onClick={() => {
                    handleremove(index);
                  }}
                >
                  Remove
                </Button>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Posted by:{index.postername}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    Posted in:{index.postedin}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {index.text}
                  </Typography>
                </CardContent>
                <CardActions
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography style={{ marginRight: 8 }}>
                    Upvotes:{index.upvotes}
                  </Typography>
                  <Typography style={{ marginRight: 8 }}>
                    Downvotes:{index.downvotes}
                  </Typography>
                </CardActions>
              </Card>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};
