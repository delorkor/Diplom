import axios from "axios";
export const GenreFilms = async (PagenNumber) => {
  const film = await axios.get(PagenNumber);

  return film.data;
};
