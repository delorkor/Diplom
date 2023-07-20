import style from "./FilmPage.module.css";

import { useEffect, useState } from "react";
import { Slyder } from "../../containers/Slyder/Slyder";
import { useParams, useLoaderData } from "react-router-dom";
import { getOnlyFilms } from "../../reqests/getOnlyFilms";
import { ButtonComp } from "../../components/ButtonComp/ButtonComp";
import { DeleteFilms } from "../../reqests/DeleteFilms";
import { useSelector } from "react-redux/es/hooks/useSelector";
export const FilmPage = () => {
    const id = useLoaderData();
    const [oneFilm, oneFilmFunction] = useState(false);
    const user = useSelector((state) => state.user);
    const getFilms = async (id) => {
        console.log(id);
        const films = await getOnlyFilms(id);
        // const films = await PagesFilms(page);
        oneFilmFunction(films);
        console.log(films);
        return films;
    };
    // const IdUser = oneFilm.data;
    console.log(oneFilm);
    const DelFilm = async (e) => {
        console.log(e.target.id);
        const Delete = await DeleteFilms(e.target.id);

        return Delete;
    };
    useEffect(() => {
        getFilms(id);
    }, []);

    return (
        <div className={style.FilmPage}>
            <div className={style.wrapper}>
                <div className={style.imgWrapper}>
                    <div className={style.imgBlock}>
                        <img
                            className={style.img}
                            src={
                                oneFilm
                                    ? "http://diplom.loc/storage/" +
                                      oneFilm.data[0].name_img_film
                                    : ""
                            }
                            alt=""
                        />
                    </div>

                    <div className={style.blockLink}>
                        {user.role === 1 ? (
                            <ButtonComp
                                id={id}
                                className={style.deleteFilms}
                                onClick={DelFilm}
                            >
                                Удалить
                            </ButtonComp>
                        ) : (
                            ""
                        )}
                    </div>
                </div>

                <div className={style.descriptionFilm}>
                    <h2>{oneFilm && oneFilm.data[0].name}</h2>
                    <div className={style.tableContent}>
                        <table>
                            <tbody>
                                <tr>
                                    <td className={style.tableTd}>Релиз:</td>
                                    <td className={style.tableTd}>
                                        {oneFilm && oneFilm.data[0].Year}
                                    </td>
                                </tr>
                                <tr>
                                    <td className={style.tableTd}>Жанр:</td>
                                    <td className={style.tableTd}>
                                        {" "}
                                        {oneFilm &&
                                            oneFilm.data[0].genres.map((i) => {
                                                return i.name + " ";
                                            })}
                                    </td>
                                </tr>
                                <tr>
                                    <td className={style.tableTd}>
                                        Категории:
                                    </td>
                                    <td className={style.tableTd}>
                                        {oneFilm &&
                                            oneFilm.data[0].category.text}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className={style.descr}>
                            {oneFilm && oneFilm.data[0].description}
                        </div>
                        <div className={style.wideowrapper}>
                            <video
                                className={style.wideo}
                                controls
                                src={
                                    oneFilm
                                        ? "http://diplom.loc/storage/" +
                                          oneFilm.data[0].name_film
                                        : ""
                                }
                            >
                                <source src="" />
                            </video>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
