import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth'

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const { username, password } = props;
  const [credentials, setCredentials] = useState(
    {
      username: '',
      password: ''
    }
  )
  
  const onChange = e => {
    e.preventDefault();
  setCredentials({
    ...credentials,
    [e.target.name]: e.target.value
  })
  };
  
  const login = e => {
    e.preventDefault();
    //make axios post request and send credentials
    console.log(credentials)
    axiosWithAuth() //change axios to axiosWithAuth() for all axios calls
    //only need ending of url because base is defined in axiosWithAuth 
      .post('/api/login', credentials)
      .then(res => {
        window.localStorage.setItem('token', res.data.payload);
        //navigate user to FriendsList
        props.history.push('/protected');
      })
      .catch(err => console.log(err.response));
  };
  
    return (
      <div className='login-form'>
        <form onSubmit={login}>
          <label>Username:</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={onChange}
            />
            <label> Password: </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
            />
            <button>Log in</button>
          </form>
      </div>
    )
  }
  
  export default Login
  