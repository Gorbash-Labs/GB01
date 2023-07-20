import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import { useNavigate } from 'react-router-dom';
export function CreateUser(){
  const [info, setInfo] = useState({ username: '', password: '',contact: '' })
  const navigate = useNavigate()
  

    const createuser = async() => {
 try{ const res = await fetch('http://localhost:3000/api/user/newuser', {
      method: 'POST',
      body: JSON.stringify({
        username: info.username,
        password: info.password,
        contact:info.contact
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res) {
      console.log(res.status)
      if (res.status === 201) {
        alert('Username has already been taken');
      } else if(res.status === 200){
        alert('User has been created')
        navigate('/login')
      }
        else {
        // Handle other error status codes
        alert('Username has already been taken');
      }
      return; // Exit the function, as there's no valid JSON data to process
    }
  }catch(err){
      console.log(err)
  }
}


  return(
    <div>
      <Navbar/>
        <div className = "loginbackground">
          <div className="formHeader">
              <h3>Welcome!</h3>
              <h3>Create your account below</h3>
            </div>
            <div class="container">
              <div class="login-form">
                <h2>Login</h2>
                <label for="username">Username</label>
                <input
                  type="text"
                  id="username"
                  className ='logininput'
                  name="username"
                  required
                  value={info.username}
                  onChange={e => {
                    setInfo({ ...info, username: e.target.value })
                  }} />
                <label for="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className ='logininput'
                  name="password"
                  required
                  value={info.password}
                  onChange={e => {
                    setInfo({ ...info, password: e.target.value })
                  }} />
                  <label for = "contact">Contact</label>
                  <input
                  type="text"
                  id="contact"
                  className ='logininput'
                  name="contact"
                  required
                  value={info.contact}
                  onChange={e => {
                    setInfo({ ...info, contact: e.target.value })
                  }} />
                <button id= 'allbuttons' type="submit" onClick={createuser}>submit</button>
              </div>
            </div>
        </div>
      </div>
  )
}