import React from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/Navbar.scss'


export default function Navbar(){
    const navigate = useNavigate();
    function home(){
        navigate("/Home")
    }
    function Login(){
      navigate("/Login")
    }
    function Profile(){
      navigate("/Profile")
    }

    return (
        <ul className="Navbar">
            <li id='allbuttons' onClick={home}>Home</li>
            <li id='allbuttons' onClick={Login}>Login</li>
            <li id='allbuttons' onClick={Profile}>Profile</li>
        </ul>
    )
}