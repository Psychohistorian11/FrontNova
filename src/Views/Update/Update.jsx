import React from 'react'
import Property from '../../Components/Property'

export const Update = () => {
  return (
    <div className='px-72 pt-16'>
      <h1 className='text-3xl font-bold border-b border-black pb-4'>Inventarios</h1>
      <div className='grid grid-cols-2 gap-6 mt-10 ' >
        <Property owner="Mary Jhonson" image="https://hips.hearstapps.com/hmg-prod/images/casa-de-madera-de-diseno-moderno21-645b7b443ba61.jpg?resize=980:*" address="Suite 448 5670 Margarette Curve, Wuckertmouth, FL 54961-5969" />
        <Property owner="Samuel Wilson" image="https://3dlancer.net/upload/galleries/891/4891/house-in-the-suburbs-of-st-petersburg-82446-xxl.jpg" address="45 Shore St. Orange, NJ 07050" />
      </div>
    </div>
  )
}
