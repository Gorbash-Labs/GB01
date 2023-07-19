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
            <li onClick={home}>Home</li>
            <li onClick={Login}>Login</li>
            <li onClick={Profile}>Profile</li>
        </ul>
    )
}