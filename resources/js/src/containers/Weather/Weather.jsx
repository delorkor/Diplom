import React, { useState } from "react";
import axios from "axios";
import style from "./Weather.module.css";
import { WeatherReqest } from "../../reqests/WeatherReqest ";
export const Weather = () => {
    const [data, setData] = useState({});
    const [location, setLocation] = useState("");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=Minsk&units=imperial&appid=4c205beb0b199b332f37ff275c4fcc8d`;

    const searchLocation = async () => {
        const form = new FormData();
        form.append("name", location);
        const Weater = await WeatherReqest(form);
        // if (event.key === "Enter") {
        // console.log(Weater.data);
        // await axios.get(url).then((response) => {

        setData(JSON.parse(Weater.data));

        //     console.log(response.data);
        // });
        // console.log(data);
        setLocation("");
        // }
    };
    console.log(data);

    return (
        <div className={style.app}>
            <div className={style.search}>
                <input
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    // onKeyDown={searchLocation}

                    // onKeyPress={searchLocation}
                    placeholder="Enter Location"
                    type="text"
                />
                <input type="submit" onClick={searchLocation} />
            </div>
            <div className={style.container}>
                <div className={style.top}>
                    <div className={style.location}>
                        <p>{data.name}</p>
                    </div>
                    <div className={style.temp}>
                        {data.main ? (
                            <h1>{data.main.temp.toFixed()}°С</h1>
                        ) : null}
                    </div>
                    <div className={style.description}>
                        {data.weather ? <p>{data.weather[0].main}</p> : null}
                    </div>
                </div>

                {data.name !== undefined && (
                    <div className={style.bottom}>
                        <div className={style.feels}>
                            {data.main ? (
                                <p className={style.bold}>
                                    {data.main.feels_like.toFixed()}°F
                                </p>
                            ) : null}
                            <p>Feels Like</p>
                        </div>
                        <div className={style.humidity}>
                            {data.main ? (
                                <p className={style.bold}>
                                    {data.main.humidity}%
                                </p>
                            ) : null}
                            <p>Humidity</p>
                        </div>
                        <div className={style.wind}>
                            {data.wind ? (
                                <p className={style.bold}>
                                    {data.wind.speed.toFixed()} MPH
                                </p>
                            ) : null}
                            <p>Wind Speed</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
