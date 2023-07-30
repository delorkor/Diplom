import styles from "./MainSearch.module.css";
import { Navigation } from "../../containers/Navigation/Navigation";
import { MovieBlock } from "../../containers/MovieBlock/MovieBlock";
import { PagesFilms } from "../../reqests/PagesFilms";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilms } from "../../store/features/FilmsSlice";
import { Link } from "../../components/Link/Link";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import img from "../../img/12.png";
import { Search } from "../../reqests/Search";
import pagesRoutes from "../../routes/pagesRoutes";
export const MainSearch = () => {
    // const id = useLoaderData();
    const navigate = useNavigate();
    const loader = useLocation();
    const { state } = loader;
    if (!state) {
        navigate(pagesRoutes.MAIN);
    }
    const [GenreFilmsAll, GenreFilmsAllFunction] = useState(false);
    const [Empty, EmptyFunction] = useState(true);

    useEffect(() => {
        SearchFilm(state);
    }, [loader]);

    const SearchFilm = async (state) => {
        const form = new FormData();

        form.append("text", state);
        const SearchF = await Search(form);

        GenreFilmsAllFunction(SearchF);
    };
    let DataLength;

    if (GenreFilmsAll) {
        DataLength = GenreFilmsAll.data;
    } else {
        DataLength = [];
    }

    return (
        <div className={styles.Main}>
            {DataLength.length ? (
                <div className={styles.content}>
                    {GenreFilmsAll &&
                        GenreFilmsAll.data.map((e) => {
                            return <MovieBlock key={e.id} data={e} />;
                        })}
                </div>
            ) : (
                <img className={styles.Images} src={img} alt="" />
            )}

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
