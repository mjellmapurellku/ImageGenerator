import React from 'react';
import { assets } from '../assets/assets';

const GenerateBtn = () => {
  return (
    <div className='pb-12 text-center'>
      <h1 className='text-2xl md:text-3xl lg:text-2xl mt-2 font-semibold text-neutral-800 py-2'>
        See the magic. Try now
      </h1>

      <button className='mt-2 inline-flex items-center gap-2 px-8 py-2 rounded-full bg-black text-white m-auto hover:scale-105 transition-all duration-500'>
        Generate
        <img src={assets.star_group} alt="Star" className='h-5' />
      </button>
    </div>
  );
}

export default GenerateBtn;
