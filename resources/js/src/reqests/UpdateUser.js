import axios from "axios";

export const UpdateUser = async (data) => {
    // data = {
    //     password_now: "",
    //     email: "1@mail.ru",
    //     id: 1,
    //     name: "Павелл",
    //     password: "1",
    // };
    const token = JSON.parse(localStorage.getItem("user")).access_token;
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const User = await axios.put(
        `http://diplom.loc/api/create/users/${data.id}`,
        data,
        config
    );
    return User;
};
