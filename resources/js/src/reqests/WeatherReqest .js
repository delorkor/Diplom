import axios from "axios";
export const WeatherReqest = async (data) => {
    const weather = await axios.get(
        `http://diplom.loc/api/Weather?name=${data}`
    );

    return weather;
};
