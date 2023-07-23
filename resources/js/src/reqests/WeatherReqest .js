import axios from "axios";
export const WeatherReqest = async () => {
    const key = "4c205beb0b199b332f37ff275c4fcc8d";
    const weather = await axios.get(
        // `https://api.openweathermap.org/data/2.5/weather?q=Minsk&units=imperial&appid=4c205beb0b199b332f37ff275c4fcc8d&units=metric`
       
    );
    console.log(weather);
    return weather;
};
