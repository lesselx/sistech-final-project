import axios from "axios";
const API_URL = "https://avatar.ristek.cs.ui.ac.id/auth/";
const config = { headers: {Authorization: 'Bearer 62fca9b9010b337ecc272d52'} }

const register = (username, role, password) => {
  return axios.post(API_URL + "register", {
    username,
    password,
    role
  }, config);
};
const login = async (username, password) => {
  const response = await axios.post(API_URL + "login", {
      username,
      password,
    }, config);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    console.log(response)
  }else{
    console.log(response)
  }
  
  return response.data;
};
const logout = () => {
  localStorage.removeItem("user");
};
const authServices = {
  register,
  login,
  logout,
};
export default authServices;