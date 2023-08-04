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
    const [data, setData] = useState({});
    const [location, setLocation] = useState("");

    const hendlerChange = (e) => {
        setFilesFunction(e.target.files[0]);
    };

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

    useEffect(() => {
        Genre();
        Cotegory();
    }, []);

    const searchLocation = async (event) => {
        if (event.key === "Enter") {
            localStorage.setItem("City", location);
            const form = new FormData();
            form.append("name", location);
            const Weater = await WeatherReqest(location);
            localStorage.setItem("weater", Weater.data);
            setData(JSON.parse(localStorage.getItem("weater")));
            setLocation("");
        }
    };
    useEffect(() => {
        setData(JSON.parse(localStorage.getItem("weater")));
    }, []);

    const exit = (e) => {
        e.preventDefault();
        delete localStorage.user;
        navigate(pagesRoutes.MAIN);
    };

    return (
        <nav className={style.Navigation}>
            <div className={style.search}>
                <div className={style.NameList}>Погода</div>
                <input
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    // onKeyDown={searchLocation}

                    onKeyPress={searchLocation}
                    placeholder="Enter Location"
                    type="text"
                />
                <div className={style.City}>
                    {localStorage.getItem("City")
                        ? localStorage.getItem("City")
                        : ""}
                </div>
                {data ? (
                    <div className={style.temp}>
                        {data.main ? (
                            <span>
                                Температура: {data.main.temp.toFixed()}°С
                            </span>
                        ) : null}
                        <br />
                        {data.main ? (
                            <span>
                                Ощущается как: {data.main.feels_like.toFixed()}
                                °C
                            </span>
                        ) : null}
                        <br />
                        {data.main ? (
                            <span>Влажность: {data.main.humidity}%</span>
                        ) : null}{" "}
                        <br />
                        {data.wind ? (
                            <span>
                                {" "}
                                Скорость: {data.wind.speed.toFixed()} м/с,
                            </span>
                        ) : null}{" "}
                        <br />
                    </div>
                ) : (
                    ""
                )}
            </div>
            {/* <NavLink to={pagesRoutes.WEATHER} className={style.Linknavigation}>
                Погода
            </NavLink> */}
            <div className={style.NameList}>Жанры</div>
            <ul className={style.ListNavi}>
                {getGanre &&
                    getGanre.data.map((index) => {
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
