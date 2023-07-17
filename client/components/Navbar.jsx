import React from 'react';
import { useNavigate } from "react-router-dom";
import './Navbar.css'


export default function Navbar(){
    const navigate = useNavigate();
    function home(){
        navigate("/Home")
    }
    function comments(){
        navigate("/Comments")
    }
    function Login(){
      navigate("/Login")
    }

    return (
        <ul className="Navbar">
            <li onClick={home}>Home</li>
            <li onClick={comments}>Comments</li>
            <li onClick={Login}>Login</li>
        </ul>
    )
}