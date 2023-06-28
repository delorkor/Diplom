import axios from "axios";
export const getGenre = async () => {
  const Genre = await axios.get(`http://diplom.loc/api/GenreAll`);

  return Genre;
};
