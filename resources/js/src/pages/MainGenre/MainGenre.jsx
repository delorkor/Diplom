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
  // const id = useLoaderData();
  const loader = useLocation();
  const { state } = loader;
  console.log(state);
  const idCotegory = useLoaderData();
  console.log(idCotegory);
  // const UrlCotegory = `http://diplom.loc/api/CategoryFilms/${idCotegory}`;

  const Url = `http://diplom.loc/api/${state}`;

  // console.log(Url);
  const [GenreFilmsAll, GenreFilmsAllFunction] = useState(false);

  const FilmsGenre = async (Url) => {
    const filmsGen = await GenreFilms(Url);

    GenreFilmsAllFunction(filmsGen);

    return filmsGen;
  };

  useEffect(() => {
    FilmsGenre(Url);
  }, [loader]);

  // useEffect(() => {
  //   FilmsCategory(UrlCotegory);
  // }, [idCotegory]);
  console.log(GenreFilmsAll);

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
