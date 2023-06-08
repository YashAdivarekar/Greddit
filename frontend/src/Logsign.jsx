import React, { useState, preventDefault } from "react";
import { useNavigate } from "react-router-dom";
import App from "./App";
import "./App.css";
import axios from "axios";

export const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [arrays, setArr] = useState([]);

  let index = 0;

  const submithandler = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("All fields should be filled");
      return (
        <>
          <Login />
        </>
      );
    }

    //
    const temp = email;
    const obj = { email: email, password: password };
    console.log(temp);

    axios
      .post("http://localhost:8000/api/users/login", obj)
      .then((res) => {
        console.log("success");
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);

        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
        alert("Wrong username or password");
        // window.location.reload()
        return (
          <>
            <Login />
          </>
        );
      });
  };

  // console.log(res.data);
  // setArr(res.data);

  // arrays.map((index) => {
  //   if (email === index.email && password === index.password) {
  //     localStorage.setItem("email", email);
  //     localStorage.setItem("password", password);
  //     navigate("/profile");
  //   }
  // });
  // // setPass(res.data.user1.password)
  // //

  // console.log(email);
  // console.log(password);
  // if (localStorage.getItem("email") === null &&
  //   localStorage.getItem("password") === null ) {
  //     alert("Wrong username or password");
  //     return (
  //       <>
  //         <Login />
  //       </>
  //     );
  // }
  // };

  if (
    localStorage.getItem("email") !== null &&
    localStorage.getItem("password") !== null
  ) {
    console.log("reached here");
    window.location.href = "/profile";
  } else {
    return (
      <form onSubmit={submithandler} className="loginForm">
        <div className="formdiv">
          <div>
            <button
              className="button"
              onClick={() => props.onChangeForm("register")}
            >
              <span>Signup</span>
            </button>
          </div>
          <br />
          <br />
          <label className="loginlabel">email</label>
          <br />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="loginfields"
          />
          <br />
          <label className="loginlabel">password</label>
          <br />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="loginfields"
          />
          <br />
          <button className="button" type="submit">
            <span>Submit</span>
          </button>
        </div>
      </form>
    );
  }
};

export const Signin = (props) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [contactno, setContactno] = useState("");
  const [password, setPassword] = useState("");

  const submithandler = async (e) => {
    e.preventDefault();
    if (
      email === "" ||
      password === "" ||
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
      console.log(password);

      axios
        .post("http://localhost:8000/api/signup", {
          firstname: firstname,
          lastname: lastname,
          username: username,
          email: email,
          age: age,
          contact: contactno,
          password: password,
        })
        .then((res) => {
          alert("Signed up");
          props.onChangeForm("login");
        })
        .catch((err)=>{
          alert('Email already exists')
        });
    }
  };

  return (
    <form onSubmit={submithandler} className="loginForm">
      <div className="formdiv">
        <div>
          <button
            className="button"
            onClick={() => props.onChangeForm("login")}
          >
            <span>Login</span>
          </button>
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
        <br />
        <label className="loginlabel">password</label>
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="loginfields"
        />
        <br />
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
  );
};
