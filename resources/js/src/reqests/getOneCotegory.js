import axios from "axios";
export const getOneCotegory = async (id) => {
    const Category = await axios.get(`http://diplom.loc/api/Category/${id}`);

    return Category.data;
};
