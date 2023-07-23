import style from "./MovieBlock.module.css";
import img from "../../img/1.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import pagesRoutes from "../../routes/pagesRoutes";
import { getOneCotegory } from "../../reqests/getOneCotegory";
import { useState, useEffect } from "react";
export const MovieBlock = ({ data }) => {
    const [categoryID, categoryIDFunction] = useState(false);
    // console.log(data.id);
    const Cotegory = async (id) => {
        const CotegoryId = await getOneCotegory(id);
        // return CotegoryId;
        categoryIDFunction(CotegoryId);
    };
    // console.log(data);
    // console.log(gen);
    // Cotegory(data.category_id);
    // useEffect(() => {
    //     if (data) {
    //         Cotegory(data.category_id);
    //     }
    // }, []);

    // console.log(categoryID);
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
            <div className={style.cotegory}>
                {data.genres.map((e) => {
                    return e.name + " ";
                })}
            </div>
            <div>
                {" "}
              
            </div>
        </div>
    );
};
