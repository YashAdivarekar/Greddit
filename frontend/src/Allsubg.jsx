import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useDebugValue, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonAppBar } from "./Navbar";
import axios from "axios";

export const AllSubG = () => {
  const navigate = useNavigate();
  const [subgs, setSubgs] = useState([]);
  const [creator, setCreator] = useState("");
  const mail = localStorage.getItem("email");
  let test = false;
  let test2 = false;
  if (mail !== creator) {
    test = true;
  }
  const getDetails = async () => {
    try {
      const resp = await axios.post("http://localhost:8000/api/getallsubg");
      setSubgs(resp.data);
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    getDetails();
  }, []);

  const Join = async (inp) => {
    console.log(mail);
    const resp = await axios.post("http://localhost:8000/api/joinreq", {
      id: inp,
      email: mail,
    });
    if (resp.data == 1) {
      alert("Done");
      console.log("done");
      window.location.reload()
    }
    else if(resp.data==2)
    {
      alert("Already sent request")
      window.location.reload()
    }
    else
    {
      alert("Error")
      window.location.reload()
    }
  };

  const Enter = (e) => {
    // setId(e);
    // console.log(e);
    let navurl = `/inallsubg/${e}`;
    navigate(navurl);
    // console.log(navurl)
  };

  const Leave=async(index)=>{
    
  }

  return (
    <div>
      <ButtonAppBar />
      <br />
      <br />
      <br />
      <br />
      <p align="center" style={{ fontSize: "1.5rem", fontcolor: "white" }}>
        Search:&nbsp;
        <TextField
          color="info"
          size="small"
          variant="outlined"
          style={{ backgroundColor: "white", fontSize: "2rem" }}
        ></TextField>
      </p>
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
                <Typography>Banned Keywords: {index.Bannedwords}</Typography>
                <br />
                <Typography>Description: {index.description}</Typography>
                <br />
                {(index.unblocked.includes(mail) || index.modmail === mail) &&
                !index.left.includes(mail) ? (
                  <>
                    <Button
                      type="submit"
                      style={{ marginLeft: "26%" }}
                      onClick={() => {
                        Enter(index._id);
                      }}
                    >
                      Enter
                    </Button>
                    <Button style={{ marginLeft: "18%" }} onClick={() => {Leave(index._id)}}>
                      Leave
                    </Button>
                  </>
                ) : (
                  <Button
                    type="submit"
                    style={{ marginLeft: "26%" }}
                    onClick={() => {
                      Join(index._id);
                    }}
                  >
                    Join
                  </Button>
                )}
              </CardContent>
            </Card>
            <br /> <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllSubG;
