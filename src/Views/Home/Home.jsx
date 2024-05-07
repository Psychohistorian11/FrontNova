import React, { useState, useEffect } from 'react';
import HomeImage from '../Home/home_img.png';
import ThreeDivsComponent from '../Home/ThreeDivs';

export const Home = () => {
  const [divPosition] = useState({ top: 175, left: 0 });
  const [divSize] = useState({ width: 1480, height: 700 });
  const [textPosition] = useState({ top: -140, left: 0 });

  useEffect(() => {
    const divElement = document.querySelector('.home-container');
    if (divElement) {
      divElement.style.transform = `translate(${divPosition.left}px, ${divPosition.top}px)`;
      divElement.style.width = `${divSize.width}px`;
      divElement.style.height = `${divSize.height}px`;
    }
  }, [divPosition, divSize]);

  return (
    <div className=' bg-white-300 w-full h-full mt-16 absolute inset-0 flex items-center justify-center'>
      <div
        className='shadow inner home-container bg-skinColor text-black p-4 rounded-lg shadow-mg w-full h-full flex items-center justify-center'
        style={{ position: 'relative', width: '100%', height: '400%' }}
      >
        <img
          src={HomeImage}
          className='max-w-full max-h-full'
          alt=''
        />

        <div
          className='absolute text-center'
          style={{ top: `${textPosition.top}px`, left: `${textPosition.left}px`, width: '100%' }}
        >
          <p className='text-5xl font-bold'>
            Optimiza tus arrendamientos con elegancia y eficiencia.
          </p>
          <p className='text-2xl text-lg font-montserrat mt-6'>
            Juntos, hacemos que cada propuesta cuente.
          </p>
        </div>
      </div>

      <div>
      <ThreeDivsComponent />
      </div>
    </div>
  );
};





