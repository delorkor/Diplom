import styles from "./Main.module.css";
import { Navigation } from "../../containers/Navigation/Navigation";
import { MovieBlock } from "../../containers/MovieBlock/MovieBlock";
import { PagesFilms } from "../../reqests/PagesFilms";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilms } from "../../store/features/FilmsSlice";
import { Link } from "../../components/Link/Link";
import { useLoaderData, useNavigate } from "react-router-dom";
import { GenreFilms } from "../../reqests/GenreFilms";
import pagesRoutes from "../../routes/pagesRoutes";
export const Main = () => {
  const id = useLoaderData();
  const [GenreFilmsAll, GenreFilmsAllFunction] = useState(false);
  const navigate = useNavigate();
  // const [pageNum, pageNumFunction] = useState("");

  let films = useSelector((state) => state.films.data);

  const dispatch = useDispatch();

  const dataFilms = async (page) => {
    const films = await PagesFilms(page);
    console.log(films);
    dispatch(setFilms(films));
  };
  const FilmsGenre = async (id) => {
    if (id !== undefined) {
      const filmsGen = await GenreFilms(id);
      GenreFilmsAllFunction(filmsGen);
      console.log(GenreFilmsAll);
      return filmsGen;
    }
  };
  useEffect(() => {
    FilmsGenre(id);

    dataFilms();
  }, []);

  return (
    <div className={styles.Main}>
      <div className={styles.content}>
        {films &&
          films.data.map((e) => {
            return <MovieBlock key={e.id} data={e} />;
          })}
      </div>
      <div className={styles.pagenation}>
        {films &&
          films.links.map((e, index) => {
            // console.log(e);
            return (
              <Link
                key={index}
                onClick={() => {
                  dataFilms(e.url);
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
