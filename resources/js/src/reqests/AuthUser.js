import axios from "axios";
export const AuthUser = async (data) => {
    // console.log(data);
    const User = await axios
        .post(`http://diplom.loc/api/login`, data)
        .catch((error) => {
            console.log(error.response.status);
            return error.response;
            console.log(error.response);
        });
    console.log(User);
    return User.data;
};
