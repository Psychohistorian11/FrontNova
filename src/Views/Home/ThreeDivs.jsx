import React from 'react';

const ThreeDivsComponent = () => {
  return (
    <div className='flex justify-center items-center h-screen h-60' style={{ marginTop: '1200px', marginLeft: '-1475px', height:'400px'}}> 
      <div className='bg-firstColor p-8 rounded-lg mx-2 w-80' style={{width:'400px', height: '320px', marginRight:'10px'}}> 
        <p className='text-white'>Texto del primer div</p>
      </div>
      <div className='bg-firstColor p-8 rounded-lg mx-2 w-80' style={{width:'400px', height: '320px', marginRight:'10px'}}>
        <p className='text-white'>Texto del segundo div</p>
      </div>
      <div className='bg-firstColor p-8 rounded-lg mx-2 w-80' style={{width:'400px', height: '320px', marginRight:'10px'}}> 
        <p className='text-white'>Texto del tercer div</p>
      </div>
    </div>
  );
};

export default ThreeDivsComponent;


