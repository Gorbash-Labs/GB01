import React from 'react';
import { useNavigate } from "react-router-dom";



export default function Navbar(){
    const navigate = useNavigate();
    function home(){
        navigate("/home")
    }
    function comments(){
        navigate("/feed")
    }
    function Login(){
      navigate("/login")
    }
    function Profile(){
      navigate("/profile")
    }

    return (
        <ul className="Navbar">
            <li onClick={home}>Home</li>
            <li onClick={comments}>Feed</li>
            <li onClick={Login}>Login</li>
            <li onClick={Profile}>Profile</li>
        </ul>
    )
}