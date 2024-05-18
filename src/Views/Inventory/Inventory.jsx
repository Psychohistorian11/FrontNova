import React from 'react'
import Property from '../../Components/Property'
import { PlusIcon } from '@heroicons/react/16/solid'
import { Link, useNavigate } from 'react-router-dom/dist'


export const Inventory = () => {
  const navigate = useNavigate()

  const handleLinkClick = () => {
    navigate('/CreateInventory')
  }
  return (
    <div className='px-72 pt-16'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold '>Inventarios</h1>
        <Link to="/CreateInventory" onClick={handleLinkClick} className='py-2 px-3 text-white bg-firstColor rounded flex items-center'>
            <PlusIcon className='size-6 mr-1'/>
            <span className="text-white">Crear Inventario</span></Link>
    </div>
    <h1 className='text-3xl font-bold border-b border-black pb-4'></h1>

      <div className='grid grid-cols-2 gap-6 mt-10 ' >
        <Property owner="Mary Jhonson" image="https://hips.hearstapps.com/hmg-prod/images/casa-de-madera-de-diseno-moderno21-645b7b443ba61.jpg?resize=980:*" address="Suite 448 5670 Margarette Curve, Wuckertmouth, FL 54961-5969" />
        <Property owner="Samuel Wilson" image="https://3dlancer.net/upload/galleries/891/4891/house-in-the-suburbs-of-st-petersburg-82446-xxl.jpg" address="45 Shore St.
Orange, NJ 07050" />
      </div>
    </div>
  )
}
