import React, {useState} from 'react';
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons';
import useGeolocation from "react-hook-geolocation";
import { ToastContainer, toast } from 'react-toastify';


function Inputs({setquery, units, setUnits}) {

  const [city, setcity] = useState('');

  const handleSearchClick=()=>{
    if(city!=='')
    setquery({q:city})
  }

  const handleLocationClick = ()=>{
    if(navigator.geolocation){
      toast.info("Fetching user Location");
      navigator.geolocation.getCurrentPosition((positions)=>{
        let lat=positions.coords.latitude;
        let lon=positions.coords.longitude;
        toast.success("Location fetched!!");
        setquery({lat,lon})
      })

    }
  }

  const handleUnitsChange =(e)=>{
    const selectedUnit= e.currentTarget.name;
    if(units!==selectedUnit)
    setUnits(selectedUnit);

  }

  
  return (
    <div className='flex flex-row justify-center my-6'>
        <div className="flex flex-row w-3/4 items-center justify-center space-x-4 ">
            <input value={city} onChange={(e)=>setcity(e.currentTarget.value)} type="text" placeholder='search for city...' className="text-x1 font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase" />
            <UilSearch  size={25} className="text-white cursor-pointer transition ease-out hover:scale-125" onClick={handleSearchClick} />
            <UilLocationPoint size={25} className="text-white cursor-pointer transition ease-out hover:scale-125" onClick={handleLocationClick} />
        </div>
        <div className="flex flex-row w-1/4 items-center justify-center">
            <button name='metric' className='text-white font-light transition ease-out hover:scale-125' onClick={handleUnitsChange} >°C</button>
            <p className='text-x1 text-white mx-1'>|</p>
            <button name='imperial' className='text-white font-light transition ease-out hover:scale-125'onClick={handleUnitsChange} >°F</button>
        </div>
    </div>
  )
}

export default Inputs