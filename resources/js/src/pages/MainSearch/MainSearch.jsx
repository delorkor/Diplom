import styles from "./MainSearch.module.css";
import { Navigation } from "../../containers/Navigation/Navigation";
import { MovieBlock } from "../../containers/MovieBlock/MovieBlock";
import { PagesFilms } from "../../reqests/PagesFilms";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilms } from "../../store/features/FilmsSlice";
import { Link } from "../../components/Link/Link";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

import { Search } from "../../reqests/Search";
import pagesRoutes from "../../routes/pagesRoutes";
export const MainSearch = () => {
    // const id = useLoaderData();
    const loader = useLocation();
    const { state } = loader;
    console.log(state);
    // const idCotegory = useLoaderData();
    // console.log(idCotegory);

    const [GenreFilmsAll, GenreFilmsAllFunction] = useState(false);
    console.log(GenreFilmsAll);
    useEffect(() => {
        SearchFilm(state);
    }, [loader]);

    const SearchFilm = async (state) => {
        const form = new FormData();

        form.append("text", state);
        const SearchF = await Search(form);
        GenreFilmsAllFunction(SearchF);
    };

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
                        // console.log(e);
                        return (
                            <Link
                                key={index}
                                onClick={() => {
                                    FilmsGenre(e.url);
                                }}
                                className={styles.PagenationLink}
                            >
                                {e.label}
                            </Link>
                        );
                    })}
            </div>
        </div>
    );
};
