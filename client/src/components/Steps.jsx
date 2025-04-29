import React from 'react'
import { stepsData } from '../assets/assets'

function Steps() {
  return (
    <div className='flex flex-col items-center justify-center my-32'>
        <h1 className='text-3x1 sm:text-4x1 font-semibold mb-2'>How it works</h1>
        <p className='text-lg text-gray-600 mb-8'>Transform Words Into Stunning Images</p>

        <div className='space-y-4 w-full max-x-3x1 text-sm'>
            {stepsData.map((item, index)=>(
                <div key={index} 
                className='flex items-center gap-4 p-5 px-8 bg-white/20 shadow=md border cursor-pinter hover:scale-[1.02] transition-all duration-300 rounded-lg'>
                    <img width={40} src={item.icon} alt="" />
                    <div className=''>
                        <h2 className='text-xl font-medium'>{item.title}</h2>
                        <p className='text-gary-500'>{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Steps