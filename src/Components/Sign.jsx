import React, { useState } from "react";
import { Info } from "lucide-react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { signingInventory } from "../api/queries";
import { sendOTP } from "../api/queries";

export const Sign = () => {
  const [showSignWindow, setShowSignWindow] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const authUser = useAuthUser();
  const idProperty = 5;

  const handleSignClick = async () => {
    try {
      const idAgent = authUser.id;
      await sendOTP(idAgent);
      setShowSignWindow(true);  
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleCloseWindow = () => {
    setShowSignWindow(false);
  };

  const handleVerification = async () => {
    try {
      const idAgent = authUser.id;
      const numInput = verificationCode;
      await signingInventory(idAgent, numInput, idProperty);
      // Aquí puedes agregar lógica adicional después de una firma exitosa
      setShowSignWindow(false);
    } catch (error) {
      console.error("Error verifying code:", error);
    }
  };

  return (
    <div>
      <button
        className="mx-2 px-4 py-2 bg-firstColor text-white rounded-md shadow hover:bg-teal-600 transition-colors"
        onClick={handleSignClick}
      >
        Firmar Inventario
      </button>
      
      {showSignWindow && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center">
          <div className="relative">
            <div className="bg-white p-8 rounded-lg" style={{ width: "800px", maxHeight: "90vh", overflowY: 'auto' }}>
              <h2 className="text-2xl mb-10 font-bold">Firma del inventario</h2>
              <div className="border-spacing-2 mx-auto">
                <p className="mb-6">
                  <div className="border border-orange-500 text-orange-500 px-3 py-1 rounded flex items-center">
                    <Info /> Te hemos enviado el código a tu correo.
                  </div>
                </p>
                <p className="text-center">Por favor, introduce el código para completar la firma.</p>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-gray-200 block mx-auto"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
              </div>
              <button
                className="bg-teal-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-teal-600 block mx-auto"
                onClick={handleVerification}
              >
                Verificar
              </button>
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                onClick={handleCloseWindow}
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
