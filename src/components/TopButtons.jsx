import React from 'react'

function TopButtons({setquery}) {

    const cities=[
        {
            id:1,
            title:'Delhi'
        },
        {
            id:2,
            title:'Hyderabad'
        },
        {
            id:3,
            title:'Mumbai'
        },
        {
            id:4,
            title:'Chennai'
        },
        {
            id:5,
            title:'Kolkata'
        },
    ]
  return (
    <div className='flex items-center justify-around my-6'>
        {cities.map((city)=>{
            return <button key={city.id} className='text-white text-lg font-medium transition ease-out hover:scale-125' 
            onClick={()=>setquery({q:city.title})}>{city.title}</button>
        })}

    </div>
  )
}

export default TopButtons