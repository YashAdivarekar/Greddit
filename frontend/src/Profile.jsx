import React, { useState, preventDefault } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { ButtonAppBar } from "./Navbar.jsx";
import axios from "axios";
import { useEffect } from "react";
import { Followers, Following } from "./following";

var editvar = 0;

export const Editpage = (props) => {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [contactno, setContactno] = useState("");

  const [followers, setFollower] = useState(0);
  const [following, setFollowing] = useState(0);

  const Getvalues = async () => {
    const temp = localStorage.getItem("email");
    console.log(temp);
    const res = await axios.post("http://localhost:8000/api/users/profile", {
      data: temp,
    });

    console.log(res.data.user1);
    console.log(res.data.user1.followers.length)

    console.log(res.data.user1.following.length)
    setFirstname(res.data.user1.firstname);
    setLastname(res.data.user1.lastname);
    setUsername(res.data.user1.username);
    setEmail(res.data.user1.email);
    setAge(res.data.user1.age);
    setContactno(res.data.user1.contact);
    setFollower(res.data.user1.followers.length)
    setFollowing(res.data.user1.following.length)
  };
  const submithandler = async (e) => {
    e.preventDefault();
    if (
      email === "" ||
      firstname === "" ||
      lastname === "" ||
      username === "" ||
      age == "" ||
      contactno == ""
    ) {
      alert("All fields should be filled");
    } else {
      console.log(firstname);
      console.log(lastname);
      console.log(username);
      console.log(email);
      console.log(age);
      console.log(contactno);
      alert("Edit complete");

      const x=await axios.post("http://localhost:8000/api/edit",{
        firstname:firstname,
      lastname:lastname,
      username:username,
      email:email,
      age:age,
      contact:contactno,
      })
      .then(navigate('/profile'))
    }
  };

  useEffect(() => {
    Getvalues();
  }, []);



  if (
    localStorage.getItem("email") ==null ||
    localStorage.getItem("password") ==null
  ) {
    window.location.href = "/";
  } else {
    return (
      <>
        <div className="App">
          <div>
            <ButtonAppBar />
          </div>
          <div className="ProfileButtons">
            <br />
            <div className="logoutbutton">
              <br />
              <button
                className="button"
                id="folowers"
                onClick={() => navigate("/followers")}
              >
                <span>Followers [{followers}]</span>
              </button>
              <button
                className="button"
                id="folowing"
                onClick={() => navigate("/following")}
              >
                <span>Following [{following}]</span>
              </button>
              <br />
            </div>
          </div>
          <form onSubmit={submithandler} className="loginForm">
            <div className="formdiv">
              <div>
              </div>
              <br />
              <br />
              <label className="loginlabel">First Name</label>
              <br />
              <input
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                type="text"
                className="loginfields"
              />
              <br />
              <label className="loginlabel">Last Name</label>
              <br />
              <input
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                type="text"
                className="loginfields"
              />
              <br />
              <label className="loginlabel">username</label>
              <br />
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="loginfields"
              />
              <br />
              <label className="loginlabel">Email</label>
              <br />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="loginfields"
              />
              <br />
              <label className="loginlabel">Age</label>
              <br />
              <input
                value={age}
                onChange={(e) => setAge(e.target.value)}
                type="number"
                className="loginfields"
              />
              <br />
              <label className="loginlabel">Contact Number</label>
              <br />
              <input
                value={contactno}
                onChange={(e) => setContactno(e.target.value)}
                type="number"
                className="loginfields"
              />
              <button
                className="button"
                type="submit"
                onClick={() => {
                  submithandler();
                }}
              >
                <span>Submit</span>
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
};

export const Profile = (props) => {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [contactno, setContactno] = useState("");
  const [followers, setFollower] = useState(0);
  const [following, setFollowing] = useState(0);

  const Getvalues = async () => {
    const temp = localStorage.getItem("email");
    console.log(temp);
    const res = await axios.post("http://localhost:8000/api/users/profile", {
      data: temp,
    });

    console.log(res.data.user1);
    setFirstname(res.data.user1.firstname);
    setLastname(res.data.user1.lastname);
    setUsername(res.data.user1.username);
    setEmail(res.data.user1.email);
    setAge(res.data.user1.age);
    setContactno(res.data.user1.contact);
    setFollower(res.data.user1.followers.length)
    setFollowing(res.data.user1.following.length)
    
    localStorage.setItem("username", res.data.user1.username);
  };

  useEffect(() => {
    Getvalues();
  }, []);

  const handleEdit = () => {
    console.log("reached");
    navigate("/edit");
  };

  if (
    localStorage.getItem("email") ==null ||
    localStorage.getItem("password") == null
  ) {
    window.location.href = "/";
  } else {
    return (
      <>
        <div className="App">
          <div>
            <ButtonAppBar />
          </div>
          <div className="ProfileButtons">
            <div className="logoutbutton">
              <br />
              <button
                className="button"
                id="folowers"
                onClick={() => navigate("/followers")}
              >
                <span>Followers [{followers}]</span>
              </button>
              <button
                className="button"
                id="folowing"
                onClick={() => navigate("/following")}
              >
                <span>Following [{following}]</span>
              </button>
              <br />
              <button
                className="button"
                id="edit"
                onClick={() => {
                  handleEdit();
                }}
              >
                <span>Edit</span>
              </button>
            </div>
          </div>
          <p>First Name: {firstname}</p>
          <br />
          <p>Last Name: {lastname}</p>
          <br />
          <p>Username: {username}</p>
          <br />
          <p>Age : {age}</p>
          <br />
          <p>Contact Number : {contactno}</p>
        </div>
      </>
    );
  }
};
