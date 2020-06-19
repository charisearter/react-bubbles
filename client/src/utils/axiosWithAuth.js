//axios with authorization
//import this in anything using axios calls
import Axios from 'axios';

export const axiosWithAuth = () => {
  //get token
  const token = window.localStorage.getItem('token');

  //create new instance
  return Axios.create({
    headers: {
      authorization: token
    },
    //adding base url http:localhost:whatever so I don't have to type it repeatedly in axios calls
  
    baseURL:'http://localhost:5000'
  });
}