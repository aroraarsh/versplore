import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import { Transition } from 'react-transition-group';

const Homepage = () => {
  const animationDuration = 500;
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/intro');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Transition in={true} timeout={animationDuration}>
        {(state) => (
          <div
            className={`max-w-md w-full p-6 bg-gray-800 rounded-lg shadow-lg transition-opacity duration-${animationDuration} ${
              state === 'entered' ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <h1 className="text-6xl font-bold text-white text-center mb-8">
              Versplore
            </h1>

            <div className="flex justify-center">
              <div className="bg-teal-500 rounded-md px-8 py-4">
                <button
                  className="text-white font-bold text-lg"
                  onClick={handleGetStarted}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </div>
  );
};

export default Homepage;
