import axios from "axios";
export const AuthUser = async (data) => {
  // console.log(data);
  const User = await axios.post(`http://diplom.loc/api/login`, data);
  // console.log(User);
  return User;
};
