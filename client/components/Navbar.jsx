import React,{useState,useContext} from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/Navbar.scss'
import { UserIdContext } from '../contexts/Contexts';

export default function Navbar(){
    const navigate = useNavigate();
 const [isUserLoggedIn,setIsUserLoggedIn] = useState(false)
 const {globalId,setGlobalId} = useContext(UserIdContext)

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
      setGlobalId('')
    }
    function CreateUser(){
      navigate("/createuser")
    }

    return (
      <div>
      { typeof globalId === 'number' ? (
        <ul className="Navbar">
          <li id='allbuttons' onClick={home}>Home</li>
          <li id='allbuttons' onClick={Profile}>Profile</li>
          <li id = 'allbuttons' onClick ={LogOut}>Log Out</li>
        </ul>
      ) : (<ul className="Navbar">
        <li id='allbuttons' onClick={home}>Home</li>
        <li id='allbuttons' onClick={Login}>Login</li>
        <li id='allbuttons' onClick={CreateUser}>Create Account</li>
      </ul>)}
    </div>
    )
}
