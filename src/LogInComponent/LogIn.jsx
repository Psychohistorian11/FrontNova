import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../Assets/KeyNova.png';

export const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/Home');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover'}} >
      <div className="flex flex-col items-center gap-10">
        <div className=" p-5 rounded-2xl w-120 ml-[-690px]">
          <div></div>
          <div className='text-black text-6xl font-bold mb-10'>Nova</div>
        </div>

        <div className="bg-white p-10 rounded-2xl box-border h-100 w-100 ml-[-690px]" >
          <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Correo electrónico</label>
              <input
                type="email"
                id="email"
                className="px-10 py-2 border border-gray-300 rounded"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Contraseña</label>
              <input
                type="password"
                id="password"
                className="px-10 py-2 border border-gray-300 rounded"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white font-bold py-2 px-4 rounded hover:bg-firstColor"
            >
              Acceder
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
