import { DateTime } from "luxon";



const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";


// https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=cdb000bc9cceff84bc1cc659bf32fee1
// https://api.openweathermap.org/data/2.5/onecall?lat=28.6667&lon=77.2167&exclude=current&appid=cdb000bc9cceff84bc1cc659bf32fee1
// https://pro.openweathermap.org/data/2.5/forecast/hourly?lat={lat}&lon={lon}&appid=cdb000bc9cceff84bc1cc659bf32fee1
// https://api.openweathermap.org/data/2.5/forecast/daily?lat=28.6667&lon=77.2167&appid=cdb000bc9cceff84bc1cc659bf32fee1


export const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY })

    return fetch(url)
        .then((res) => res.json());

}

export const formatCurrentWeather = (data) => {
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed }
    } = data

    const { main: details, icon } = weather[0];

    return { lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, details, icon, speed }

}

// const formatForecastWeather=(data)=>{
//     let {timezone, daily, hourly} = data;
//     daily = daily?.slice(1,6).map((d)=>{
//         return{
//             title: formatToLocalTime(d.dt, timezone, 'ccc'),
//             temp: d.temp,
//             icon:d.weather[0].icon
//         }
//     })
//     hourly = hourly?.slice(1,6).map((d)=>{
//         return{
//             title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
//             temp: d.temp.day,
//             icon:d.weather[0].icon
//         }
//     })
//     return {timezone, daily, hourly }
// }

export const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather);

    //const { lat, lon } = formatCurrentWeather;
    //const formattedForecastWeather = await getWeatherData('onecall', { lat, lon, exclude: "current,minutely,alerts", units: searchParams.units }).then(formatForecastWeather)

    return formattedCurrentWeather;
    //return {...formattedCurrentWeather, ...formattedForecastWeather};
}


export const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
export const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`

// export default getFormattedWeatherData;
// export {iconUrlFromCode, formatToLocalTime};