import './App.css';
import { useState } from 'react'
import axios from 'axios'

function App() {
  
  const [registerData, setRegisterData] = useState({username:'',email:'',password:''})
  const [loginData, setLoginData] = useState({username:'',password:''})

  const handleRegister = (e) =>{
    e.preventDefault();
    axios.post('http://localhost:3001/register',registerData)
  }

  const handleLogin = (e) =>{
    e.preventDefault();
    axios.post('http://localhost:3001/login',loginData)
  }

  const showAllUser = () =>{
    fetch('http://localhost:3001/get_user')
    .then(res=>res.json())
    .then(data=>console.log(data))
  }

  return (
    <div className="App">

      {/* Register Form */}
      <form className="app__register-form" onSubmit={(e)=>handleRegister(e)}>
        <div className="app__register-username">
          <p>Username</p>
          <input type="text" name="username" onChange={(e)=>setRegisterData((prev)=>{return{...prev,username:e.target.value}})}/>
        </div>
        <div className="app__register-email">
          <p>Email</p>
          <input type="email" name="email" onChange={(e)=>setRegisterData((prev)=>{return{...prev,email:e.target.value}})}/>
        </div>
        <div className="app__register-password">
          <p>Password</p>
          <input type="password" name="password"onChange={(e)=>setRegisterData((prev)=>{return{...prev,password:e.target.value}})}/>
        </div>
        <div className="app__register-submit">
          <p>
            <input type="submit" value="Register"/>
          </p>
        </div>
      </form>
      <button onClick={showAllUser}>Get All User In Console Log</button>

      {/* Login Form */}
      <div>
      <form className="app__login-form" onSubmit={(e)=>handleLogin(e)}>
        <div className="app__login-username">
          <p>Username</p>
          <input type="text" name="username" onChange={(e)=>setLoginData((prev)=>{return{...prev,username:e.target.value}})}/>
        </div>
        <div className="app__login-password">
          <p>Password</p>
          <input type="password" name="password"onChange={(e)=>setLoginData((prev)=>{return{...prev,password:e.target.value}})}/>
        </div>
        <div className="app__login-submit">
          <p>
            <input type="submit" value="Login"/>
          </p>
        </div>
      </form>
      </div>
    </div>
  );
}

export default App;
