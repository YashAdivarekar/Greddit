import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";

import "./Profile.css";
import { useNavigate, useParams } from "react-router-dom";

export const MysubgBar = () => {
  const navigate = useNavigate();
  const {id}=useParams()
  let userurl=`/users/${id}`
  let joinurl=`/join/${id}`
  let reporturl=`/reports/${id}`
  let statsurl=`/stats/${id}`
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: "flex", alignItems: "left" }}
          >
            Greddit
          </Typography>
          <Button color="inherit" onClick={()=>{navigate(userurl)}}>Users</Button>
          <Button color="inherit" onClick={()=>{navigate(joinurl)}}>Join Requests</Button>
          <Button color="inherit" onClick={()=>{navigate(statsurl)}}>Stats</Button>
          <Button color="inherit" onClick={()=>{navigate(reporturl)}}>Reports</Button>
          <Button color="inherit" onClick={()=>{navigate('/mysubg')}}>MYSUBGREDDIT</Button>
          <Button color="inherit" onClick={()=>{navigate('/allsubg')}}>SUBGREDDIT</Button>
          <Button color="inherit" onClick={()=>{navigate('/saved')}}>SAVED POSTS</Button>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              navigate("/profile");
            }}
          >
            <AccountBoxIcon />
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              localStorage.removeItem("email");
              localStorage.removeItem("password");
              localStorage.removeItem("username");
              navigate("/");
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MysubgBar
