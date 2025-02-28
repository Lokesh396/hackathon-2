import React, { useEffect } from "react";
import { Outlet,useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function Home() {
    const navigate = useNavigate();
    useEffect(()=>{
        navigate("Sankranthi")
    },[])
  return (
    <div>
      <NavBar/>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
