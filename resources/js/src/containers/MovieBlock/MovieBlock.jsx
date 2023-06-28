import style from "./MovieBlock.module.css";
import img from "../../img/1.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import pagesRoutes from "../../routes/pagesRoutes";

export const MovieBlock = ({ data }) => {
    return (
        <div className={style.MovieBlock}>
            <div className={style.BoxImg}>
                <NavLink to={pagesRoutes.MOVIE_PAGE + "/" + `${data.id}`}>
                    {" "}
                    <img
                        className={style.img}
                        // src={
                        //     "Diplom.loc/storage/app/public/FILMS_img/glYVgRuU2Xgkd6okIqq7eFoAiFz1DdWEin0gzIgZ.jpg"
                        // }
                        // src={"storage/" + data.name_img_film}
                        src={data.name_img_film}
                        alt=""
                    />
                </NavLink>
            </div>
            <div className={style.name}>{data.name}</div>
            <div className={style.cotegory}>movie</div>
        </div>
    );
};
