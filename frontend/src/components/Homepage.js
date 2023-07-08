import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import { Transition } from 'react-transition-group';
import { AiOutlineInfoCircle } from 'react-icons/ai';

const Homepage = () => {
  const animationDuration = 500;
  const navigate = useNavigate();
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const handleGetStarted = () => {
    navigate('/intro');
  };

  const handleInfoIconClick = () => {
    setIsInfoOpen(true);
  };

  const handleCloseInfo = () => {
    setIsInfoOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Transition in={true} timeout={animationDuration}>
        {(state) => (
          <div
            className={`max-w-md w-full p-6 bg-gray-800 rounded-lg shadow-lg transition-opacity duration-${animationDuration} ${state === 'entered' ? 'opacity-100' : 'opacity-0'
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

            <div className="flex justify-center mt-8">
              <button className="text-gray-400" onClick={handleInfoIconClick}>
                <AiOutlineInfoCircle size={24} />
              </button>
            </div>

            {isInfoOpen && (
              <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
                <div className="max-w-md w-full p-6 bg-gray-800 rounded-lg">
                  <h2 className="text-3xl font-bold text-white mb-4">Info</h2>
                  <p className="text-white">
                    Creators: Arsh Arora and Manav Sharma
                    <br/><br/>
                    <a
                      href="https://github.com/aroraarsh/versplore.git"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      GitHub Repository
                    </a>
                  </p>

                  <div className="flex justify-end mt-4">
                    <button
                      className="text-gray-400"
                      onClick={handleCloseInfo}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </Transition>
    </div>
  );
};

export default Homepage;
