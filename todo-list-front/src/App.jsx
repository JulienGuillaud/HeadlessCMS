import { useState, useEffect } from 'react';
import './App.css';

import { Col, Layout, Row } from "antd";
import React, { Fragment} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API } from "./constant";
import { setToken } from "./helpers";
import AppHeader from './components/Appheader/Appheader';
import AppRoutes from './Routes';
import { useAuthContext } from './context/AuthContext';

function App() {
  const navigate = useNavigate();
  const { Header, Content } = Layout;
  // const isConnected = cookies.get('connected')
  const isConnected = true;
  // const [showFormBG, setShowFormBG] = useState(!isConnected)
  // const [showSignUp, setShowSignUp] = useState(false)
  // const [showSignIn, setShowSignIn] = useState(!isConnected)
  // const [connected, setConnected] = useState(isConnected)
  // const [error, setError] = useState("");


  // function logout() {
  //   cookies.set('connected', 'false', { path: '/' });
  //   setConnected(false);
  //   update();
  //   showLoginPopup(true);
  // }

  // function signup(){
  //   setShowSignUp(true);
  //   setShowSignIn(false);
  // }

  // function showLoginPopup(show){
  //   show=false;
  //   setShowSignIn(show);
  //   setShowFormBG(show);
  // }

  // function connect() {
  //   let login = document.querySelector('.login').value;
  //   let password = document.querySelector('.password').value;
  //   navigate("/profile", { replace: true });
    // onFinish({email:login, password:password})
    // if (login === 'admin' && password === 'admin') {
    //   setConnected(true);
    //   showLoginPopup(false);
    //   cookies.set('connected', 'true', { path: '/' });// Pacman
    //   update();
    // } else {
    //   cookies.set('connected', 'false', { path: '/' });// Pacman
    //   setError('Login or password is incorrect');
    // }
  // }


  // const SignIn = () => {
  //   const navigate = useNavigate();
  
  //   const { setUser } = useAuthContext();
  
  //   const [isLoading, setIsLoading] = useState(false);
  
  //   const [error, setError] = useState("");
  
  //   const onFinish = async (values) => {
  //     setIsLoading(true);
  //     try {
  //       const value = {
  //         identifier: values.email,
  //         password: values.password,
  //       };
  //       const response = await fetch(`${API}/auth/local`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(value),
  //       });
  
  //       const data = await response.json();
  //       if (data?.error) {
  //         throw data?.error;
  //       } else {
  //         // set the token
  //         setToken(data.jwt);
  
  //         // set the user
  //         setUser(data.user);
  
  //         message.success(`Welcome back ${data.user.username}!`);
          
  //         setConnected(true);
  //         showLoginPopup(false);
  //         cookies.set('connected', 'true', { path: '/' });// Pacman
  //         update();
  //         // navigate("/profile", { replace: true });
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       setError(error?.message ?? "Something went wrong!");
  //       cookies.set('connected', 'false', { path: '/' });// Pacman
  //       setError('Login or password is incorrect');
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  // }

  return (
    <div className="app">
      <Header>
                <AppHeader />
              </Header>
      <main>
        


      </main>
      <Content>
                <AppRoutes />
              </Content>
    </div>
  )
}
export default App;


/*


{showFormBG ? <div className='connectFormBG'></div> : null}
        {showSignIn ? <div className='connectFormWrapper'><form className="form">
          <div className='loginInput'>
            <img src="https://img.icons8.com/?size=512&id=34105&format=png" alt="login" />
            <input type="text" className="login" placeholder="Login" />
          </div>
          <div className='loginPassword'>
            <img src="https://img.icons8.com/?size=512&id=84905&format=png" alt="login" />
            <input type="password" className="password" placeholder="Password" />
          </div>
          <div>{error}</div>
          <button type="button" className="connect" onClick={connect}>Connect</button>
          <button type="button" className="signup" onClick={signup}>sign-up</button>
        </form></div>: null}

        */