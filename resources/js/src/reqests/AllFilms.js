import axios from "axios";
export const AuthUser = async () => {
  // console.log(data);
  const User = await axios.post(`https://diplom.loc/api/login`);
  // console.log(User);
  return User;
};
