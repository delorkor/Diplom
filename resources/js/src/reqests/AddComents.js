import axios from "axios";

export const AddComents = async (data) => {
    const token = JSON.parse(localStorage.getItem("user")).access_token;

    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const Films = await axios.post(
        "http://diplom.loc/api/add/Comments",
        data,
        config
    );
    return Films;
};
