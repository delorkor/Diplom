import style from "./FilmPage.module.css";

import { useEffect, useState } from "react";
import { Slyder } from "../../containers/Slyder/Slyder";
import { useParams, useLoaderData } from "react-router-dom";
import { getOnlyFilms } from "../../reqests/getOnlyFilms";
import { ButtonComp } from "../../components/ButtonComp/ButtonComp";
import { DeleteFilms } from "../../reqests/DeleteFilms";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Textarea } from "../../components/Textarea/Textarea";
import { AddComents } from "../../reqests/AddComents";
import { CommentFilms } from "../../reqests/CommentFilms";
import { Link } from "../../components/Link/Link";
import { useNavigate } from "react-router-dom";
import pagesRoutes from "../../routes/pagesRoutes";

export const FilmPage = () => {
    const id = useLoaderData();
    const [oneFilm, oneFilmFunction] = useState(false);
    const [getCom, getComFilmFunction] = useState(false);
    const [Comments, CommentsFunction] = useState("");
    const [CommentsUpdate, CommentsUpdateFunction] = useState("");
    const user = useSelector((state) => state.user);
    const uri = `http://diplom.loc/api/Comments/film/${id}`;
    const navigate = useNavigate();
    const getFilms = async (id) => {
        // console.log(id);
        const films = await getOnlyFilms(id);

        oneFilmFunction(films);
        navigate(pagesRoutes.MOVIE_PAGE + "/" + `${id}`);
        return films;
    };
    console.log(getCom);
    const getComments = async (uri) => {
        const comment = await CommentFilms(uri);
        getComFilmFunction(comment);

        return comment;
    };

    const DelFilm = async (e) => {
        const Delete = await DeleteFilms(e.target.id);
        navigate(pagesRoutes.MAIN);
        return Delete;
    };
    useEffect(() => {
        getFilms(id);
        getComments(uri);
    }, []);

    const CommentsAdd = async () => {
        const form = new FormData();
        form.append("text", Comments);
        form.append("id", id);
        const fileDown = AddComents(form);
        CommentsFunction("");
        CommentsUpdateFunction(fileDown);

        window.location.reload();
    };

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
                        {user.role === 1 || localStorage.getItem("user") ? (
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
            {localStorage.getItem("user") ? (
                <div className={style.Coments}>
                    {" "}
                    <Textarea
                        onChange={(e) => {
                            CommentsFunction(e.target.value);
                        }}
                        type="text"
                        // {...register("description")}
                        // error={errors.description?.message}
                        className={style.Textarea}
                        value={Comments}
                    ></Textarea>
                    <button className={style.FilmsComp} onClick={CommentsAdd}>
                        Отправить
                    </button>
                </div>
            ) : (
                ""
            )}

            <div className={style.CommentWrapper}>
                {getCom &&
                    getCom.data.map((i) => {
                        
                        return (
                            <div key={i.id}>
                                <div className={style.name}>
                                    {i.comment_user.name}
                                </div>
                                <div className={style.ComentsUser}>
                                    {i.text}
                                </div>
                            </div>
                        );
                    })}
            </div>
            <div className={style.pagenation}>
                {getCom &&
                    getCom.links.map((e, index) => {
                        {
                            // console.log(e);
                        }
                        if (index == 0) {
                            return (
                                <Link
                                    key={index}
                                    onClick={() => {
                                        getComments(e.url);
                                    }}
                                    className={style.PagenationLink}
                                >
                                    <svg
                                        className={style.arrow}
                                        fill="#80858b"
                                        width="24px"
                                        height="24px"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g
                                            id="SVGRepo_bgCarrier"
                                            strokeWidth="0"
                                        />

                                        <g
                                            id="SVGRepo_tracerCarrier"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />

                                        <g id="SVGRepo_iconCarrier">
                                            {" "}
                                            <g data-name="Layer 2">
                                                {" "}
                                                <g data-name="arrow-ios-back">
                                                    {" "}
                                                    <rect
                                                        width="24"
                                                        height="24"
                                                        transform="rotate(90 12 12)"
                                                        opacity="0"
                                                    />{" "}
                                                    <path d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z" />{" "}
                                                </g>{" "}
                                            </g>{" "}
                                        </g>
                                    </svg>
                                </Link>
                            );
                        } else if (index == getCom.links.length - 1) {
                            return (
                                <Link
                                    key={index}
                                    onClick={() => {
                                        getComments(e.url);
                                    }}
                                    className={style.PagenationLink}
                                >
                                    <svg
                                        className={style.arrow}
                                        fill="#80858b"
                                        width="24px"
                                        height="24px"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g
                                            id="SVGRepo_bgCarrier"
                                            strokeWidth="0"
                                        />

                                        <g
                                            id="SVGRepo_tracerCarrier"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />

                                        <g id="SVGRepo_iconCarrier">
                                            {" "}
                                            <g data-name="Layer 2">
                                                {" "}
                                                <g data-name="arrow-ios-forward">
                                                    {" "}
                                                    <rect
                                                        width="24"
                                                        height="24"
                                                        transform="rotate(-90 12 12)"
                                                        opacity="0"
                                                    />{" "}
                                                    <path d="M10 19a1 1 0 0 1-.64-.23 1 1 0 0 1-.13-1.41L13.71 12 9.39 6.63a1 1 0 0 1 .15-1.41 1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19z" />{" "}
                                                </g>{" "}
                                            </g>{" "}
                                        </g>
                                    </svg>
                                </Link>
                            );
                        } else if (
                            index > getCom.current_page - 3 &&
                            index < getCom.current_page + 3
                        ) {
                            return (
                                <Link
                                    key={index}
                                    onClick={() => {
                                        getComments(e.url);
                                    }}
                                    className={
                                        e.active
                                            ? style.PagenationLinkActiv
                                            : style.PagenationLink
                                    }
                                >
                                    {e.label}
                                </Link>
                            );
                        } else if (index == getCom.links.length - 2) {
                            return (
                                <div key={index}>
                                    <span className={style.PagenationLink}>
                                        ...
                                    </span>
                                    <Link
                                        key={index}
                                        onClick={() => {
                                            getComments(e.url);
                                        }}
                                        className={
                                            e.active
                                                ? style.PagenationLinkActiv
                                                : style.PagenationLink
                                        }
                                    >
                                        {e.label}
                                    </Link>
                                </div>
                            );
                        } else if (index == 1) {
                            return (
                                <div key={index}>
                                    <Link
                                        key={index}
                                        onClick={() => {
                                            getComments(e.url);
                                        }}
                                        className={
                                            e.active
                                                ? style.PagenationLinkActiv
                                                : style.PagenationLink
                                        }
                                    >
                                        {e.label}
                                    </Link>

                                    <span className={style.PagenationLink}>
                                        ...
                                    </span>
                                </div>
                            );
                        } else if (index < getCom.current_page - 4) {
                            return (
                                <Link
                                    key={index}
                                    onClick={() => {
                                        getComments(e.url);
                                    }}
                                    className={
                                        e.active
                                            ? style.PagenationLinkActiv
                                            : style.PagenationLink
                                    }
                                >
                                    {e.label}
                                </Link>
                            );
                        }
                    })}
            </div>
        </div>
    );
};
