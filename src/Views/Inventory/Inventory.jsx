import React from 'react'
import Property from '../../Components/Property'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getProperties } from '../../api/queries'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import Loading from '../../Components/Loading'
import { HomeModernIcon, RectangleGroupIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { PlusIcon } from 'lucide-react'



export const Inventory = () => {
  const authUser = useAuthUser();

  const { data: properties, isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: () => getProperties(authUser.id)
  })
  const { data } = useMutation()

  // const properties = [
  //   {
  //     id: 1,
  //     owner: "Mary Jhonson",
  //     image: "https://hips.hearstapps.com/hmg-prod/images/casa-de-madera-de-diseno-moderno21-645b7b443ba61.jpg?resize=980:*",
  //     address: "Suite 448 5670 Margarette Curve, Wuckertmouth, FL 54961-596"
  //   },
  //   {
  //     id: 2,
  //     owner: "Samuel Wilson",
  //     image: "https://3dlancer.net/upload/galleries/891/4891/house-in-the-suburbs-of-st-petersburg-82446-xxl.jpg",
  //     address: "45 Shore St. Orange, NJ 07050"
  //   }
  // ]

  function handleDelete(idProperty){
    return
  }

  if (isLoading) {
    return <Loading />
  }

  const handleLinkClick = () => {
    navigate('/h/createInventory')
  }

  const propertiesElements = properties?.map(property => (
    <Property
      key={property.idPropiedad}
      owner={property.owner} 
      image={property.image}
      address={property.direccion} 
      handleDelete={() => handleDelete(property.id)}
      linkToDetail= {`/h/inventory/${property.idPropiedad}`}
    />
  ))

  return (
    <>
    <div className=''>
    <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold '>Inventarios</h1>
        <Link to="/h/createInventory" onClick={handleLinkClick} className='py-2 px-3 text-white bg-firstColor rounded flex items-center'>
            <PlusIcon className='size-6 mr-1'/>
            <span className="text-white">Crear Inventario</span></Link>
    </div>
    <h1 className='text-3xl font-bold border-b border-black pb-4'></h1>
      {
        properties.length === 0 ?
          <div className='absolute inset-x-0 mt-20  flex flex-col items-center justify-center'>
            <RectangleGroupIcon className='size-24' color='#0E9594'/>
            {/* <HomeModernIcon className='size-24' color='#0E9594'/> */}
            <p className='mt-2 italic text-firstColor'>No has añadido ningún inventario</p>
          </div>
          :
          <div className='grid grid-cols-4 gap-6 mt-10 ' >
            {propertiesElements}
          </div>
      }
      </div>
    </>
  )
}
