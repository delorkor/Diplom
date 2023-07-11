import axios from "axios";
export const RemuveToken = async () => {
    const token = JSON.parse(localStorage.getItem("user")).access_token;
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    const LogautUser = await axios.get(`http://diplom.loc/api/logout`, config);

    return LogautUser;
};
