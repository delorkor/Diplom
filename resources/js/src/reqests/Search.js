import axios from "axios";
export const Search = async (data) => {
    const Searchfilm = await axios.post(
        `http://diplom.loc/api/FilmsSearch`,
        data
    );

    return Searchfilm.data[0];
};
