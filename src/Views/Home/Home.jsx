import { useEffect } from 'react';
import HomeImage from '../Home/home_img.png';
import ThreeDivsComponent from '../Home/ThreeDivs';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated){
      navigate('/h')
    }
  }, [])
  

  return (
    <>
      <div className='flex flex-col items-center justify-center mt-20'>
        <div className='p-10 rounded-lg shadow-mg flex flex-col items-center'>
          <div className='text-center'>
            <p className='text-5xl font-bold'>
              Optimiza tus arrendamientos con elegancia y eficiencia.
            </p>
            <p className='text-2xl font-montserrat mt-6'>
              Juntos, hacemos que cada propuesta cuente.
            </p>
          </div>
          <img src={HomeImage} className='mt-10 w-3/5 object-contain' alt='' />
        </div>
        <div>
          <ThreeDivsComponent />
        </div>
      </div>
    </>
  );
};
