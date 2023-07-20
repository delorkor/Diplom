import axios from "axios";
export const CategoryFilms = async (PagenNumber) => {
    const film = await axios.get(PagenNumber);

    return film.data[0];
};
