import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

const Intro = () => {
  const navigate = useNavigate();

  const handlePlayNow = () => {
    navigate('/Genre');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-xl w-full mx-auto mt-8 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-10">
          Welcome to Versplore
        </h1>

        <p className="text-white text-lg md:text-xl text-center mb-6">
        Versplore is an interactive quiz platform that tests your knowledge of music lyrics across various genres. Challenge yourself with a series of questions where you have to identify the correct song based on the given lyrics. Whether you're into Pop, Rap, R&B, Rock, or even Disney music, Versplore offers a diverse range of genres to put your music knowledge to the test. Think you're a music aficionado? Put your skills to the test and see how well you really know your favorite songs.
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
