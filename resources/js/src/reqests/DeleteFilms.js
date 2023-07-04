import axios from "axios";
export const DeleteFilms = async (id) => {
    console.log(id);
    const token = JSON.parse(localStorage.getItem("user")).access_token;
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    console.log(id);

    const film = await axios.delete(
        `http://diplom.loc/api/delete/Films/${id}`,
        config
    );

    return film;
};
