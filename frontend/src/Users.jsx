import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ButtonAppBar } from "./Navbar";

export const Users = () => {
  const { id } = useParams();
  // console.log(id)
  useEffect(() => {
    Unblocked();
    Blocked();
  }, []);
  const [unblockedusers, setUnblockedusers] = useState([]);

  const [blockedusers, setBlockedusers] = useState([]);
  const Unblocked = async () => {
    // console.log(id)
    const resp = await axios.post("http://localhost:8000/api/usersunblockeddata", {
      id: id,
    });
    console.log(resp.data);
    setUnblockedusers(resp.data);
    console.log(unblockedusers);
  };

  const Blocked = async () => {
    // console.log(id)
    const resp = await axios.post("http://localhost:8000/api/usersblockeddata", {
      id: id,
    });
    console.log(resp.data);
    setBlockedusers(resp.data);
    console.log(blockedusers);
  };


  return (
    <>
    <ButtonAppBar/>
    <br /><br /><br /><br />
      <div>
        <p>Unblocked users</p>
        {unblockedusers.map((index) => (
          <div>
            <p>{index}</p>
          </div>
        ))}
      </div>

      <div>
        <p>Blocked users</p>
        {blockedusers.map((index) => (
          <div>
            <p>{index}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Users;
