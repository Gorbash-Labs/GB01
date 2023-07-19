import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/Navbar.scss'


export default function Navbar(){
    const navigate = useNavigate();
 const [isUserLoggedIn,setIsUserLoggedIn] = useState(false)

    function home(){
        navigate("/Home")
    }
    function Login(){
      navigate("/Login")
    }
    function Profile(){
      navigate("/Profile")
    }
    function LogOut(){
      setIsUserLoggedIn(false)
    }

    return (
      <div>
      {isUserLoggedIn ? (
        <ul className="Navbar">
          <li id='allbuttons' onClick={home}>Home</li>
          <li id='allbuttons' onClick={Profile}>Profile</li>
          <li id = 'allbuttons' onClick ={LogOut}>Log Out</li>
        </ul>
      ) : (<ul className="Navbar">
        <li id='allbuttons' onClick={home}>Home</li>
        <li id='allbuttons' onClick={Login}>Login</li>
        <li id='allbuttons' >Create Account</li>
      </ul>)}
    </div>
    )
}
