import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonAppBar } from "./Navbar";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import axios from "axios";
import { PostCard } from "./Posts";
import { Link } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const InAllSubGrd = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newpost, setNewpost] = useState("");
  const [posts, setPosts] = useState([]);
  const val = localStorage.getItem("email");

  const valname = localStorage.getItem("username");
  const [subgrd, setSubgrd] = useState([]);
  const navigate = useNavigate();

  const { id } = useParams();

  const getsubgrd = async () => {
    try {
      const resp = await axios.post("http://localhost:8000/api/getsubgdata", {
        id: id,
      });
      setSubgrd(resp.data[0]);
      // console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  const SubmitPost = async () => {
    const resp = await axios.post("http://localhost:8000/api/newpost", {
      postername:valname,
      postedby:val,
      postedin:subgrd.name,
      postedinid:subgrd._id,
      text:newpost,
      upvotes:0,
      downvotes:0
    });
  };


  const getPosts = async () => {
    try {
      const resp = await axios.post("http://localhost:8000/api/getallposts", {
        id: id,
      });
      setPosts(resp.data);
      // console.log(resp.data)
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    getsubgrd();
    getPosts();
  }, []);


 

 

  return (
    <div>
      <ButtonAppBar />
      <br />
      <br />
      <br />
      <br />
      <div style={{ display: "flex" }}>
        <div style={{ width: 400,position:'fixed',backgroundColor:"pink" }}>
          <img
            src="https://www.w3schools.com/images/w3schools_green.jpg"
            alt="W3Schools.com"
          ></img>
          <div>
            <p>Subgreddit Name:{subgrd.name}</p>
            <p>Description:{subgrd.description}</p>
          </div>
        </div>
        <div style={{marginLeft:'40%'}}>
          <Button onClick={handleOpen}>Open modal</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div style={{ marginLeft: "2%", display: "flex" }}>New Post:</div>
              <br />
              <TextField
                style={{ marginLeft: "2%", width: "80%" }}
                multiline
                rows={4}
                value={newpost}
                onChange={(e) => setNewpost(e.target.value)}
              ></TextField>
              <br /> <br />
              <Button type="submit" onClick={SubmitPost}>
                Submit
              </Button>
              <br /> <br />
            </Box>
          </Modal>
          <br /><br /><br />
          
          <div style={{ marginLeft: "5%" }}>
            {posts.map((index) => (
              <PostCard props={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InAllSubGrd;
