import axios from "axios";

const LoginCheck = async () => {
  const token = localStorage.getItem("token");  
  if(!token){
    return {
      loggedIn: false,
      user: null,
    };  
  }
  try {
    const response = await axios.post("http://localhost:3000/api/auth/getuser", null, {
      headers: {
        authToken: localStorage.getItem("token"),
      },
    });
    return {
      loggedIn: true,
      user: response.data,
    };
  } catch (error) {
    return {
      loggedIn: false,
      user: null,
    };
  }
};

export default LoginCheck;
