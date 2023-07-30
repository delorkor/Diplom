import axios from "axios";
export const CommentFilms = async (uri) => {
    const Comments = await axios.get(uri);

    return Comments.data[0];
};
