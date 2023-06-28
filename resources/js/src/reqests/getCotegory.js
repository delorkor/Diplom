import axios from "axios";
export const getCotegory = async () => {
  const Category = await axios.get(`http://diplom.loc/api/CategoryFilms`);

  return Category;
};
