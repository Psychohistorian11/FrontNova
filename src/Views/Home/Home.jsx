import React, { useState, useEffect } from 'react';
import HomeImage from '../Home/home_img.png';
import ThreeDivsComponent from '../Home/ThreeDivs';

export const Home = () => {

  return (
    <>
      <div className='flex flex-col items-center justify-center mt-20'>
        <div className='shadow bg-white text-black p-10 rounded-lg shadow-mg flex flex-col items-center'>
          <div className='text-center'>
            <p className='text-5xl font-bold'>
              Optimiza tus arrendamientos con elegancia y eficiencia.
            </p>
            <p className='text-2xl font-montserrat mt-6'>
              Juntos, hacemos que cada propuesta cuente.
            </p>
          </div>
          <img src={HomeImage} className='mt-5 w-3/5 object-contain' alt='' />
        </div>
        <div>
          <ThreeDivsComponent />
        </div>
      </div>
    </>
  );
};
