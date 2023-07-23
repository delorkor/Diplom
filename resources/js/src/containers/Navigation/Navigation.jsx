import { Link } from "../../components/Link/Link";
import style from "./Navigation.module.css";
import { Input } from "../../components/Input/Input";
import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import pagesRoutes from "../../routes/pagesRoutes";
import { ButtonComp } from "../../components/ButtonComp/ButtonComp";
import { getGenre } from "../../reqests/getGenre";
import { getCotegory } from "../../reqests/getCotegory";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { WeatherReqest } from "../../reqests/WeatherReqest ";
export const Navigation = () => {
    const [getGanre, getGanreFunction] = useState(false);
    const [getCoteg, getCotegoryFunction] = useState(false);
    const navigate = useNavigate();
    const [setFiles, setFilesFunction] = useState(null);
    const [UserAdmin, getUserAdminFunction] = useState(false);
    const user = useSelector((state) => state.user);
    console.log(user);
    const hendlerChange = (e) => {
        console.log(e.target.files);
        setFilesFunction(e.target.files[0]);
    };
    console.log(UserAdmin);
    const Genre = async () => {
        const GanreAll = await getGenre();
        getGanreFunction(GanreAll);
        return GanreAll;
    };
    const Cotegory = async () => {
        const CotegoryAll = await getCotegory();
        getCotegoryFunction(CotegoryAll);
        return CotegoryAll;
    };
    // console.log(WeatherReqest());
    useEffect(() => {
        Genre();
        Cotegory();

        // if (localStorage.getItem("user")) {
        //     const user = JSON.parse(localStorage.getItem("user")).user;
        //     getUserAdminFunction(user);
        // }
    }, []);

    const exit = (e) => {
        e.preventDefault();
        delete localStorage.user;
        navigate(pagesRoutes.MAIN);
    };

    return (
        <nav className={style.Navigation}>
            <NavLink to={pagesRoutes.WEATHER} className={style.Linknavigation}>
                Погода
            </NavLink>
            <div className={style.NameList}>Жанры</div>
            <ul className={style.ListNavi}>
                {getGanre &&
                    getGanre.data.map((index) => {
                        // console.log(index.id);
                        return (
                            <li key={index.id} className={style.List}>
                                <NavLink
                                    to={pagesRoutes.Genre + "/" + `${index.id}`}
                                    state={`GenreFilms/${index.id}`}
                                    key={index.id}
                                    className={style.Linknavigation}
                                >
                                    {index.name}
                                </NavLink>
                            </li>
                        );
                    })}

                {/* <li className={style.List}>
          <Link className={style.Linknavigation} onClick={exit}>
            exit
          </Link>
        </li> */}
            </ul>

            <ul className={style.ListNavi}>
                <div className={style.NameList}>Котегории</div>
                {getCoteg &&
                    getCoteg.data.map((index) => {
                        // console.log(index.id);
                        return (
                            <li className={style.List} key={index.id}>
                                <NavLink
                                    to={
                                        pagesRoutes.Cotegory +
                                        "/" +
                                        `${index.id}`
                                    }
                                    state={`CategoryFilms/${index.id}`}
                                    key={index.id}
                                    className={style.Linknavigation}
                                >
                                    {index.text}
                                </NavLink>
                            </li>
                        );
                    })}
            </ul>
            {user.role === 1 ? (
                <ul className={style.ListNavi}>
                    <div className={style.NameList}>Админ-панель</div>
                    <li className={style.List}>
                        <NavLink
                            to={pagesRoutes.MOVIE}
                            className={style.Linknavigation}
                        >
                            Добавить фильм
                        </NavLink>
                    </li>
                </ul>
            ) : (
                ""
            )}
        </nav>
    );
};
