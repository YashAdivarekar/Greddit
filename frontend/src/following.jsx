import React, { useState, preventDefault, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Followers = () => {
  const navigate = useNavigate();
  const [follower, setFollower] = useState([]);

  const getfollowers = async () => {
    const resp = await axios.post("http://localhost:8000/api/getfollowers", {
      email: localStorage.getItem("email"),
    });
    setFollower(resp.data[0].followers);
    console.log(resp.data[0].followers);
  };
  useEffect(() => {
    getfollowers();
  }, []);

  const handledelete = async (index) => {
    const resp = await axios.post("http://localhost:8000/api/deletefollowing", {
      useremail: index,
      newmail: localStorage.getItem("email"),
    });
    console.log("success");
    console.log("success");
  };

  // if (
  //   localStorage.getItem("email") != "admin" &&
  //   localStorage.getItem("password") != "admin"
  // ) {
  //   window.location.href = "/";
  // } else {
  return (
    <>
      <h1>Followers</h1>
      {follower.map((index) => (
        <div>
          <p>
            {index}&nbsp;
            <button
              onClick={() => {
                handledelete(index);
              }}
            >
              Delete
            </button>
          </p>
        </div>
      ))}
      <button className="button" onClick={() => navigate("/profile")}>
        <span>Back</span>
      </button>
    </>
  );
  // }
};

export const Following = () => {
  const navigate = useNavigate();

  const [following, setFollowing] = useState([]);

  const getfollowers = async () => {
    const resp = await axios.post("http://localhost:8000/api/getfollowing", {
      email: localStorage.getItem("email"),
    });
    setFollowing(resp.data[0].following);
    console.log(resp.data[0].following);
  };
  useEffect(() => {
    getfollowers();
  }, []);

  const handledelete = async (index) => {
    const resp = await axios.post("http://localhost:8000/api/deletefollowing", {
      useremail: localStorage.getItem("email"),
      newmail: index,
    });
    console.log("success");
  };

  // if (
  //   localStorage.getItem("email") != "admin" &&
  //   localStorage.getItem("password") != "admin"
  // ) {
  //   window.location.href = "/";
  // } else {
    return (
      <>
        <h1>Following</h1>
        {following.map((index) => (
          <div>
            <p>
              {index}&nbsp;
              <button
                onClick={() => {
                  handledelete(index);
                }}
              >
                Delete
              </button>
            </p>
          </div>
        ))}
        <button className="button" onClick={() => navigate("/profile")}>
          <span>Back</span>
        </button>
      </>
    );
  // }
};
