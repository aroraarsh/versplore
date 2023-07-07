import React from 'react';
import { useNavigate } from 'react-router-dom';

const Selector = () => {
  const navigate = useNavigate();

  const navigateToLyricsGuesser = () => {
    navigate('/genre');
  };

  const navigateToSongGuesser = () => {
    navigate('/Game');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Choose a Game</h1>
      </div>
      <div className="mt-8 flex justify-center">
        <button
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg mx-2"
          onClick={navigateToLyricsGuesser}
        >
          Lyrics Guesser Game
        </button>
        <button
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg mx-2"
          onClick={navigateToSongGuesser}
        >
          Song Guesser Game
        </button>
      </div>
    </div>
  );
};

export default Selector;
