import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

const Intro = () => {
  const navigate = useNavigate();

  const handlePlayNow = () => {
    navigate('/selector');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-xl w-full mx-auto mt-8 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-10">
          Welcome to Versplore
        </h1>
        <p className="text-white text-lg md:text-xl text-center mb-6">
          <ul className="list-disc list-inside">
            <li>
              Song Guesser by Listening: Listen to snippets of songs from various genres and try to guess the correct song title. Test your ear for music and see if you can identify the songs based on their melodies and rhythms.
            </li>
            <li>
              Song Guesser by Lyrics: Read the given lyrics and try to guess the correct song title. Put your knowledge of song lyrics to the test as you try to match the words to the right song.
            </li>
          </ul>
          Whether you prefer guessing songs by listening or by lyrics, Versplore has the perfect games to keep you entertained and test your music expertise. Join now and show off your skills in both song guessing challenges!
        </p>
        <div className="flex justify-center">
          <button
            className="bg-teal-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
            onClick={handlePlayNow}
          >
            Play Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Intro;
