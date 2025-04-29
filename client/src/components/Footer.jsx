import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 py-3 mt-20'>
      <img src={assets.logo} alt="Logo" width={150} />

      <div className='w-px h-6 bg-gray-300'></div>

      <p className='flex-1 text-sm text-gray-500 max-sm:hidden pl-4'>
        All rights reserved. Copyright @//
      </p>

      <div className='flex gap-2.5'>
        <img src={assets.facebook_icon} alt="Facebook" />
        <img src={assets.twitter_icon} alt="Twitter" />
        <img src={assets.instagram_icon} alt="Instagram" />
      </div>
    </div>
  );
}

export default Footer;
