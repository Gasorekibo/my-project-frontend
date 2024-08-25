import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
      <div className="bg-white rounded-lg p-8 shadow-lg">
        <div className="flex flex-col items-center">
          <img
            src="https://ih1.redbubble.net/image.298109018.2896/st,small,507x507-pad,600x600,f8f8f8.u5.jpg"
            alt="404 Sticker"
            className="mx-auto mb-4"
            style={{ maxWidth: "150px" }}
          />
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
            Oops! Lost in Space?
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            It seems you've wandered into uncharted territory. But don't worry,
            you can find your way back by clicking the button below.
          </p>
          <button
            className="block mx-auto bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => navigate("/")}
          >
            Back Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;