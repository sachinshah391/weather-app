// import logo from './logo.svg';
import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react';
import { useState, useEffect } from 'react';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getWeatherData from './services/weatherService';
import {getFormattedWeatherData} from './services/weatherService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [query, setquery] = useState({ q: 'delhi' });
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);


  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((positions) => {
        let lat = positions.coords.latitude;
        let lon = positions.coords.longitude;

        setquery({ lat, lon })
      })

    }
  }

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location,";

      toast.info("Fetching weather for " + message);

      const data = await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}`
        )
        setWeather(data);
      })
      //setWeather(data));
    }
    fetchWeather();
  }, [query, units])

  const formatBackground = () => {
    if (!weather) return 'from-cyan-700 to-blue-700';

    const threshold = units === 'metric' ? 20 : 60;

    if (weather.temp <= threshold)
      return 'from-cyan-700 to-blue-700'

      return 'from-yellow-700 to-orange-700';
  }


  return (
    <div className="flex">
      <div className={`mx-auto mt-60 rounded-lg max-w-screen-xl py-5 px-20 bg-gradient-to-br ${formatBackground()} h-fit shadwo-x1 shadow-gray-400`}>
        <TopButtons setquery={setquery} />
        <Inputs setquery={setquery} units={units} setUnits={setUnits} />
        {weather &&
          <div>
            <TimeAndLocation weather={weather} />
            <TemperatureAndDetails weather={weather} units={units} setUnits={setUnits} />
            {/* <Forecast title="hourly forecast" items={weather.hourly} />
            <Forecast title="daily forecast" items={weather.daily}/> */}
          </div>

        }
      </div>
      <ToastContainer autoClose={3000} theme="colored" newestOnTop={true} />
    </div>
  );
}

export default App;
