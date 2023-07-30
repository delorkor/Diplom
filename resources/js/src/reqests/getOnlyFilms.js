import axios from "axios";
export const getOnlyFilms = async (id) => {
    // const token = JSON.parse(localStorage.getItem("user")).access_token;
    // const config = {
    //   headers: { Authorization: `Bearer ${token}` },
    // };

    const film = await axios.get(`http://diplom.loc/api/Films/${id}`);

    return film;
};
