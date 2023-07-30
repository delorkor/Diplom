import styles from "./MainGenre.module.css";
import { Navigation } from "../../containers/Navigation/Navigation";
import { MovieBlock } from "../../containers/MovieBlock/MovieBlock";
import { PagesFilms } from "../../reqests/PagesFilms";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilms } from "../../store/features/FilmsSlice";
import { Link } from "../../components/Link/Link";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { GenreFilms } from "../../reqests/GenreFilms";
import pagesRoutes from "../../routes/pagesRoutes";
export const MainGenre = () => {
    const id = useLoaderData();
    const loader = useLocation();
    const { state } = loader;

    const Url = `http://diplom.loc/api/GenreFilms/${id}`;

    const [GenreFilmsAll, GenreFilmsAllFunction] = useState(false);

    const FilmsGenre = async (Url) => {
        const filmsGen = await GenreFilms(Url);

        GenreFilmsAllFunction(filmsGen);

        return filmsGen;
    };
    useEffect(() => {
        FilmsGenre(Url);
    }, []);
    useEffect(() => {
        FilmsGenre(Url);
    }, [loader]);

    return (
        <div className={styles.Main}>
            <div className={styles.content}>
                {GenreFilmsAll &&
                    GenreFilmsAll.data.map((e) => {
                        return <MovieBlock key={e.id} data={e} />;
                    })}
            </div>
            <div className={styles.pagenation}>
                {GenreFilmsAll &&
                    GenreFilmsAll.links.map((e, index) => {
                        if (index == 0) {
                            return (
                                <Link
                                    key={index}
                                    onClick={() => {
                                        FilmsGenre(e.url);
                                    }}
                                    className={styles.PagenationLink}
                                >
                                    <svg
                                        className={styles.arrow}
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
                        } else if (index == GenreFilmsAll.links.length - 1) {
                            return (
                                <Link
                                    key={index}
                                    onClick={() => {
                                        FilmsGenre(e.url);
                                    }}
                                    className={styles.PagenationLink}
                                >
                                    <svg
                                        className={styles.arrow}
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
                            index > GenreFilmsAll.current_page - 3 &&
                            index < GenreFilmsAll.current_page + 3
                        ) {
                            return (
                                <Link
                                    key={index}
                                    onClick={() => {
                                        FilmsGenre(e.url);
                                    }}
                                    className={
                                        e.active
                                            ? styles.PagenationLinkActiv
                                            : styles.PagenationLink
                                    }
                                >
                                    {e.label}
                                </Link>
                            );
                        } else if (index == GenreFilmsAll.links.length - 2) {
                            return (
                                <div key={index}>
                                    <span className={styles.PagenationLink}>
                                        ...
                                    </span>
                                    <Link
                                        key={index}
                                        onClick={() => {
                                            FilmsGenre(e.url);
                                        }}
                                        className={
                                            e.active
                                                ? styles.PagenationLinkActiv
                                                : styles.PagenationLink
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
                                            FilmsGenre(e.url);
                                        }}
                                        className={
                                            e.active
                                                ? styles.PagenationLinkActiv
                                                : styles.PagenationLink
                                        }
                                    >
                                        {e.label}
                                    </Link>

                                    <span className={styles.PagenationLink}>
                                        ...
                                    </span>
                                </div>
                            );
                        } else if (index < GenreFilmsAll.current_page - 4) {
                            return (
                                <Link
                                    key={index}
                                    onClick={() => {
                                        FilmsGenre(e.url);
                                    }}
                                    className={
                                        e.active
                                            ? styles.PagenationLinkActiv
                                            : styles.PagenationLink
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
