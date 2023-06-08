import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Login, Signin } from "./Logsign.jsx";

function App() {
  const [logsignflag, setLogsignflag] = useState('login');

  const changeForm =(formname)=>
  {
    setLogsignflag(formname);
    return(
      <App/>
    );
  }

  if (logsignflag === 'login') {
    return (
      <div className="App">
        <Login onChangeForm={changeForm}/>
      </div>
    );
  }
  else {
    return (
      <div className="App">
        <Signin onChangeForm={changeForm}/>
      </div>
    );
  }


  // return (
  //   <div className="App">

  //     {/* <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header> */}
  //   </div>
  // );
}

export default App;
