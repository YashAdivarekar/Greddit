import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { ButtonAppBar } from "./Navbar";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Joinreqin from "./Joinreqin"

export const Joinreq = () => {
  const { id } = useParams();
  // console.log(id)
  useEffect(() => {
    JoinReqs();
  }, []);
  const [joinrequests, setJoinrequests] = useState([]);
  const JoinReqs = async () => {
    // console.log(id)
    const resp = await axios.post("http://localhost:8000/api/joinreqdata", {
      id: id,
    });
    // console.log(resp.data)
    setJoinrequests(resp.data);
    // console.log(joinrequests)
  };

  const Accept = async (e) => {
    const resp = await axios.post("http://localhost:8000/acceptjoinreq", {
      id: id,
      uname: e,
    });
  };
  const Reject = () => {};

  return (
    <>
      <ButtonAppBar />
      <br />
      <br />
      <br />
      <br />
      <div>
        <h1>Pending Joining Requests:</h1>
        <br />
        <br />
        <br />
        {joinrequests.map((index) => (
          <Joinreqin props={{mail:index,subg:id}}/>
        ))}
      </div>
    </>
  );
};

export default Joinreq;
