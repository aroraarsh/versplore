import React from 'react';
import { useNavigate } from 'react-router-dom';

const Genre = () => {
  const navigate = useNavigate();

  const handlePopClick = () => {
    navigate("/Quiz?genre=pop");
  };

  const handleRapClick = () => {
    navigate("/Quiz?genre=rap");
  };

  const handleDisneyClick = () => {
    navigate("/Quiz?genre=disney");
  };

  const handleRnbClick = () => {
    navigate("/Quiz?genre=rnb");
  };

  const handleCountryClick = () => {
    navigate("/Quiz?genre=country");
  };

  const handleRockClick = () => {
    navigate("/Quiz?genre=rock");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-white text-4xl font-bold mb-8">Select a Genre to Play with</h1>
        <div>
          <button
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-8 mr-4 mb-4 rounded-lg"
            onClick={handlePopClick}
          >
            Pop
          </button>
          <button
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-8 mr-4 mb-4 rounded-lg"
            onClick={handleRapClick}
          >
            Rap
          </button>
          <button
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-8 mr-4 rounded-lg"
            onClick={handleDisneyClick}
          >
            Disney
          </button>
          <div className="flex">
            <button
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-8 mr-4 rounded-lg"
              onClick={handleRnbClick}
            >
              R&B
            </button>
            <button
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-8 mr-4 rounded-lg"
              onClick={handleCountryClick}
            >
              Country
            </button>
            <button
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-8 rounded-lg"
              onClick={handleRockClick}
            >
              Rock
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Genre;
