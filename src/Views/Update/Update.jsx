import React from 'react'
import Property from '../../Components/Property'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getProperties } from '../../api/queries'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import Loading from '../../Components/Loading'

export const Update = () => {
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


  const propertiesElements = properties?.map(property => (
    <Property
      key={property.id}
      owner={property.owner} 
      image={property.image}
      address={property.address} 
      handleDelete={() => handleDelete(property.id)}
    />
  ))

  return (
    <>
      <h1 className='text-3xl font-bold border-b border-black pb-4'>Inventarios</h1>
        <div className='grid grid-cols-4 gap-6 mt-10 ' >
          {propertiesElements}
          {propertiesElements}
        </div>
    </>
  )
}
