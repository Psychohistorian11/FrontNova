import React, { useState, useRef } from "react";
import dropdown_number_1 from '../../Assets/dropdown_number_1.png';
import dropdown_number_2 from '../../Assets/dropdown_number_2.png';
import dropdown_newSpace from '../../Assets/dropdown_newSpace.png';
import { useNavigate } from 'react-router-dom';

export const Spaces = () => {

  const [spaces, setSpaces] = useState([
    { name: 'Baño', video: null, observation: false },
    { name: 'Cocina', video: null, observation: false },
    { name: 'Dormitorio', video: null, observation: false }
  ]);
  const [newSpace, setNewSpace] = useState('');
  const [features, setFeatures] = useState({});
  const [selectSpaceFile, setSelectedSpaceFile] = useState(null)

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleAddSpace = () => {
    setSpaces([...spaces, { name: newSpace, video: null, observation: false }]);
    setNewSpace('');
  };

  const handleSearchFeatures = async (space) => {
    if (features[space]) {
      setFeatures({ ...features, [space]: null });
    } else {
      const simulatedFeatures = [
        { address: 'Observaciones' },
        { address: 'Añadir Componentes' },
        { address: 'Fotografía' },
      ];
      setFeatures({ ...features, [space]: simulatedFeatures });
    }
  };

  const handleObservations = (spaceIndex) => {
    const updatedSpaces = [...spaces];
    updatedSpaces[spaceIndex].observation = !updatedSpaces[spaceIndex].observation;
    setSpaces(updatedSpaces);
  };

  const handleAddComponents = () => {
    navigate('/Components');
  };

  const handleAddVideo = (space) => {
    setSelectedSpaceFile(space);
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const updatedSpaces = [...spaces];
    const index = updatedSpaces.findIndex(space => space.name === selectSpaceFile);
    updatedSpaces[index].video = file;
    setSpaces(updatedSpaces);
  }

  return (
    <>
      
      <div className="p-20">
        <h2 className="text-2xl font-montserrat mb-6 font-bold">Espacios</h2>
        <h2 className='border-b border-black mb-10'> Gestiona y crea espacios para la vivienda</h2>
        <div className='px-40'>
          {spaces.map((space, index) => (
            <div key={index} className='text-xl border-b border-black mb-6'>
              <button
                onClick={() => handleSearchFeatures(space.name)}
                className="flex items-center"
              >
                <img src={dropdown_number_1} className={`mr-2 ${features[space.name] ? "rotate-90" : dropdown_number_2}`} />
                {space.name}
              </button>
              {features[space.name] && (
                <div className="mt-4 bg-skinColor rounded-lg p-6 ">
                  <ul >

                    <li className="mb-2">
                      <div>
                        <button
                          onClick={() => handleObservations(index)}
                          className="flex items-center px-4 py-2 bg-white text-black shadow hover:bg-firstColor transition-colors border border-black w-80 h-10"
                        >
                          <span className="mr-2">{space.observation ? "-" : "+"}</span>
                          <span>Observaciones</span>
                        </button>
                      </div>

                      <div className="px-16">

                        {space.observation && (
                          <input
                            type="text"
                            onChange={(e) => {
                              const updatedSpaces = [...spaces];
                              updatedSpaces[index].observation = e.target.value;
                              setSpaces(updatedSpaces);
                            }}
                            className="mt-2  text-sm w-full p-2 border border-black "
                            placeholder="Escribe tus observaciones aquí"
                          />
                        )}
                      </div>
                    </li>

                    <li className="flex justify-start items-center mb-2">

                      <button
                        onClick={handleAddComponents}
                        className="flex items-center px-4 py-2 bg-white text-black  shadow hover:bg-firstColor transition-colors border border-black w-80 h-10"
                      >
                        <span className="mr-2"> + </span>
                        <span>Añadir Componentes</span>
                      </button>

                    </li>
                    <li className="flex justify-start items-center mb-2">
                      <button
                        onClick={() => handleAddVideo(space.name)}
                        className="flex items-center px-4 py-2 bg-white text-firstColor  shadow  transition-colors border border-firstColor border-dashed w-80 h-10"
                      >
                        <span className="text-firstColor mr-2">+</span>
                        <span className="text-firstColor">Añadir Video</span>
                      </button>
                      <input
                        type="file"
                        id="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        accept="video/*" 
                      />

                    </li>
                    {space.video && (
                      <div>
                        <p>Video seleccionado</p>
                        <video
                          controls 
                          src={URL.createObjectURL(space.video)}
                          style={{ maxWidth: '50%', marginTop: '10px' }}
                        />
                      </div>
                    )}
                  </ul>
                </div>
              )}
            </div>
          ))}
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={dropdown_newSpace} alt="description" />
              <input
                type="text"
                value={newSpace}
                onChange={(e) => setNewSpace(e.target.value)}
                placeholder="Agregar Espacio "
              />
              <button className="mx-2 px-4 py-2 bg-firstColor text-white rounded-md shadow hover:bg-teal-600 transition-colors font-montserrat"
                onClick={handleAddSpace}>Crear
                  </button>

            </div>

          </div>

        </div>
      </div>
    </>
  );
};
