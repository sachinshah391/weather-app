import React from 'react'
import { formatToLocalTime } from '../services/weatherService'

function TimeAndLocation({weather}) {
  return (
    <div className=''>
        <div className='flex items-center justify-center my-6'>
            <p className='text-white text-x1 font-extralight'>{formatToLocalTime(weather.dt,weather.timezone)}</p>
        </div>
        <div className='flex items-center justify-center my-3'>
            <p className='text-white text-x1 font-extralight'>{`${weather.name}, ${weather.country}`}</p>
        </div>
    </div>
  )
}

export default TimeAndLocation