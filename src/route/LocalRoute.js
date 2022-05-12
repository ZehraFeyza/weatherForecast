import React from 'react'
import { Navigate } from "react-router-dom";

const LocalRoute = ({children}) => {
  
   
const useremail = localStorage.getItem("email");
const userpassword = localStorage.getItem("password");

  if (!(useremail || userpassword)) return <Navigate to="/" />;

  return children;
};
    


export default LocalRoute