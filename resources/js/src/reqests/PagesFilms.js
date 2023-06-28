import axios from "axios";
export const PagesFilms = async (
  PagenNumber = `http://diplom.loc/api/Films?page=1`
  // PagenNumber = 1
) => {
  // let url = `http://diplom.loc/api/Films?page=${PagenNumber}`;
  // const User = await axios.get(url);
  const User = await axios.get(PagenNumber);
  // console.log(User.data);
  return User.data;
};
