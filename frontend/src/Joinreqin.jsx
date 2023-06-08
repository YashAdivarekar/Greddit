import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { ButtonAppBar } from "./Navbar";
import Card from "@mui/material/Card";

import Typography from "@mui/material/Typography";

export const Joinreqin = (props) => {
  const mail = props.props.mail;
  console.log("mail",props)

  const [user, setUser] = useState("");

  const finduser = async () => {
    const resp = await axios.post("http://localhost:8000/api/finduser", {
      email: mail,
    });
    setUser(resp.data);
  };
  useEffect(() => {
    finduser();
  }, []);

  const Accept = async () => {
    const resp = await axios.post("http://localhost:8000/api/acceptjoin", {
      email:mail,
      id:props.props.subg
    });
  };
  const Reject = async() => {
    const resp = await axios.post("http://localhost:8000/api/rejectjoin", {
      email:mail,
      id:props.props.subg
    });
  };

  return (
    <>
      <div style={{ marginLeft: "10%", fontSize: "1.5rem" }}>
        {/* {index} &nbsp;&nbsp;&nbsp;&nbsp;{" "} */}
        <Button
          variant="outlined"
          onClick={() => {
            Accept();
          }}
        >
          Accept
        </Button>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;{" "}
        <Button
          variant="outlined"
          onClick={() => {
            Reject();
          }}
        >
          Reject
        </Button>
        <Typography variant="h5" component="h2">
          Firstname:{user.firstname}
        </Typography>
        <Typography variant="h5" component="h2">
          Lastname:{user.lastname}
        </Typography>
        <Typography variant="h5" component="h2">
          Posted by:{user.username}
        </Typography>
        <Typography variant="h5" component="h2">
          Email:{user.email}
        </Typography>
        <Typography variant="h5" component="h2">
          Age:{user.age}
        </Typography>
        <Typography variant="h5" component="h2">
          Contact:{user.contact}
        </Typography>
        <Typography variant="h5" component="h2"></Typography>
      </div>
    </>
  );
};

export default Joinreqin;
