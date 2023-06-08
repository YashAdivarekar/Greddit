import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonAppBar } from "./Navbar";

export const FormMySubg = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [banned, setBannedwords] = useState("");
  const [tags, setTags] = useState("");
  const [followers, setfollowers] = useState(1);
  const [posts, setposts] = useState(0);
  const navigate = useNavigate();
  const usermail = localStorage.getItem("email");
  const username = localStorage.getItem("username");
  // console.log(user);
  const Submit = async () => {
    if (name === "" || desc === "") {
      alert("name and description required");
      return <FormMySubg />;
    } else {
      let data = {
        name: name,
        description: desc,
        tags: tags,
        Bannedwords: banned,
        modname: username,
        modmail: usermail,
        followers: followers,
      };
      console.log(data);
      try {
        const resp = await axios.post(
          "http://localhost:8000/api/newsubgrdform",
          data
        );
      } catch (err) {
        console.log(err);
        console.log("error is here");
      }

      navigate("/mysubg");
    }
  };
  return (
    <>
      <ButtonAppBar />
      <div align="center">
        <form
          className="form"
          style={{
            color: "black",
            marginTop: "10%",
            backgroundColor: "white",
            width: 400,
          }}
        >
          <h2>Create a new SubGreddiit</h2>
          <p style={{ marginTop: "15%", fontSize: "20px" }}>
            Name:{" "}
            <TextField value={name} onChange={(e) => setName(e.target.value)} />
            <br />
            <br />
            Description:{" "}
            <TextField value={desc} onChange={(e) => setDesc(e.target.value)} />
            <br />
            <br />
            Tags:{" "}
            <TextField value={tags} onChange={(e) => setTags(e.target.value)} />
            <br />
            <br />
            List of Banned Keywords
            <br />
            <br />
            <TextField
              variant="outlined"
              multiline
              rows={4}
              value={banned}
              onChange={(e) => setBannedwords(e.target.value)}
            />
            <br />
            <br />
            <br />
            <Button onClick={Submit} color="inherit" variant="outlined">
              Create
            </Button>
          </p>
        </form>
      </div>
    </>
  );
};

export const Mysubg = () => {
  const navigate = useNavigate();
  const Newgreddiit = () => {
    navigate("/formmysubg");
  };
  const [subgs, setSubgs] = useState([]);
  const getDetails = async () => {
    try {
      const usermail = localStorage.getItem("email");
      const resp = await axios.post("http://localhost:8000/api/getmysubgs", {
        data: usermail,
      });
      console.log(resp.data);
      setSubgs(resp.data);
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    getDetails();
  }, []);

  const Enter = (e) => {
    let url = `/inmysubg/${e}`;
    navigate(url);
  };
  const DeleteSubg = async (e) => {
    axios
      .post("http://localhost:8000/api/deletesubg", {
        _id: e,
      })
      .then((res) => {
        console.log("success");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <ButtonAppBar />
      <br />
      <br />
      <br />
      <br />
      <div>
        <Button onClick={Newgreddiit}>Add New Greddiit</Button>
      </div>
      <br />
      <br />
      <div align="center">
        {subgs.map((index) => (
          <div align="left" style={{ width: "40%" }}>
            <Card>
              <CardContent style={{ marginLeft: "5%", marginTop: "2%" }}>
                <Typography variant="h5">{index.name}</Typography>
                <br />
                <br />
                <Typography>Number of Followers: {index.followers}</Typography>
                <br />
                <Typography>Number of Posts: {index.posts.length}</Typography>
                <br />
                <Typography>Tags: {index.tags}</Typography>
                <br />
                <Typography>Banned Keywords: {index.Bannedwords}</Typography>
                <br />
                <Typography>Description: {index.description}</Typography>
                <br />
                <Button
                  type="submit"
                  style={{ marginLeft: "26%" }}
                  onClick={() => {
                    Enter(index._id);
                  }}
                >
                  Open
                </Button>
                <Button
                  style={{ marginLeft: "18%" }}
                  onClick={() => {
                    DeleteSubg(index._id);
                  }}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
            <br /> <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mysubg;
