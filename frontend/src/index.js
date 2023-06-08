import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Profile, Editpage } from './Profile';
import { Followers, Following } from './following';
import { PostCard } from './Posts'
import { FormMySubg, Mysubg } from './Mysubg'
import { Saved } from './Saved';
import {Users} from './Users'
import {MysubgBar} from './Mysubgin'
import {Joinreq} from './Joinrq'
import {AllSubG} from './Allsubg'
import {InAllSubGrd} from './Allsubgin'

// import  express  from 'express';
// const app= express();

// const PORT=8000;
// app.listen(PORT,()=>{
//   console.log(`Server started on port : ${PORT}`);
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/followers" element={<Followers />} />
        <Route path="/following" element={<Following />} />
        <Route path="/edit" element={<Editpage />} />
        <Route path="/post" element={<PostCard />} />
        <Route path="/mysubg" element={<Mysubg />} />
        <Route path="/formmysubg" element={<FormMySubg />} />
        <Route path="/allsubg" element={<AllSubG />} />
        <Route path="/inmysubg/:id" element={<MysubgBar />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/users/:id" element={<Users />} />
        <Route path="/join/:id" element={<Joinreq />} />
        <Route path="/inallsubg/:id" element={<InAllSubGrd />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
