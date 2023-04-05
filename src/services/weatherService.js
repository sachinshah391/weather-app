import { DateTime } from "luxon";

const API_KEY = "cdb000bc9cceff84bc1cc659bf32fee1";
const BASE_URL = "https://api.openweathermap.org/data/2.5";


// https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=cdb000bc9cceff84bc1cc659bf32fee1
// https://api.openweathermap.org/data/2.5/onecall?lat=28.6667&lon=77.2167&exclude=current&appid=cdb000bc9cceff84bc1cc659bf32fee1
// https://pro.openweathermap.org/data/2.5/forecast/hourly?lat={lat}&lon={lon}&appid=cdb000bc9cceff84bc1cc659bf32fee1
// https://api.openweathermap.org/data/2.5/forecast/daily?lat=28.6667&lon=77.2167&appid=cdb000bc9cceff84bc1cc659bf32fee1
//The URL() constructor returns a newly created URL object representing the URL defined by the parameters.
/*
Base URLs:
let baseUrl = "https://developer.mozilla.org";

let A = new URL("/", baseUrl);
=> 'https://developer.mozilla.org/'

let B = new URL(baseUrl);
=> 'https://developer.mozilla.org/'

new URL("en-US/docs", B);
=> 'https://developer.mozilla.org/en-US/docs'
*/


//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const getWeatherData = (infoType, searchParams) => {

    //searchParams --- ita a obj which will convert in query, cotains after ? mark is query in URL 
    const url = new URL(BASE_URL + "/" + infoType);
    // console.log('url value is', url);
    // console.log('url.search value is', url.search);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY })

    return fetch(url)
        .then((res) => res.json());

}

const formatCurrentWeather = (data) => {
    console.log('data value',data)
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

const formatForecastWeather=(data)=>{
    console.log('data value daily',data)
    let {timezone, daily, hourly} = data;
    daily = daily?.slice(1,6).map((d)=>{
        return{
            title: formatToLocalTime(d.dt, timezone, 'ccc'),
            temp: d.temp,
            icon:d.weather[0].icon

        }


    })
    hourly = hourly?.slice(1,6).map((d)=>{
        return{
            title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
            temp: d.temp.day,
            icon:d.weather[0].icon

        }


    })

    return {timezone, daily, hourly }

}

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather);

    const { lat, lon } = formatCurrentWeather;
    //const formattedForecastWeather = await getWeatherData('onecall', { lat, lon, exclude: "current,minutely,alerts", units: searchParams.units }).then(formatForecastWeather)
    
    return formattedCurrentWeather;
    //return {...formattedCurrentWeather, ...formattedForecastWeather};
}


const formatToLocalTime= (secs, zone, format="cccc, dd LLL yyyy' | Local time: 'hh:mm a")=> DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
const iconUrlFromCode = (code)=>`http://openweathermap.org/img/wn/${code}@2x.png`

export default getFormattedWeatherData;
export {iconUrlFromCode, formatToLocalTime};