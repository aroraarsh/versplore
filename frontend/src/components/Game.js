import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Game = () => {
  const [lyrics, setLyrics] = useState('');
  const [correctSong, setCorrectSong] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [audioElement, setAudioElement] = useState(null);
  const [round, setRound] = useState(1);
  const totalRounds = 5;
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGame();
  }, [round]);

  const fetchGame = async () => {
    try {
      const response = await fetch('http://manavsharma57.pythonanywhere.com/api/game/spotify');
      if (response.ok) {
        const data = await response.json();
        setLyrics(data.lyrics);
        setCorrectSong(data.correct_song);
        setOptions(data.options);
        setPreviewUrl(data.preview_url);
        if (audioElement) {
          audioElement.pause();
        }
        setIsPlaying(false);
        setAudioElement(new Audio(data.preview_url));
      } else {
        console.error('Failed to fetch game.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const playPreview = () => {
    if (previewUrl) {
      if (audioElement && audioElement.paused) {
        audioElement.play();
        setIsPlaying(true);
      } else if (audioElement && !audioElement.paused) {
        audioElement.pause();
        setIsPlaying(false);
      } else {
        const newAudioElement = new Audio(previewUrl);
        setAudioElement(newAudioElement);
        newAudioElement.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error('Error playing audio:', error);
            setIsPlaying(false);
          });
      }
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option === correctSong) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextRound = () => {
    if (round < totalRounds) {
      setRound((prevRound) => prevRound + 1);
      setSelectedOption('');
      setIsPlaying(false);
    }
  };

  const handleRestartGame = () => {
    setRound(1);
    setScore(0);
    setSelectedOption('');
    setIsPlaying(false);
  };

  const handleLyricGuesserGame = () => {
    navigate('/genre');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Guess the Song</h1>
        <p className="text-gray-400 mt-2">Listen to the lyrics snippet and guess the correct song!</p>
      </div>
      <div className="mt-8 bg-gray-800 p-6 rounded-lg">
        <div className="text-white text-center">{lyrics}</div>
        <div className="mt-8 flex flex-wrap justify-center">
          {options.map((option, index) => (
            <button
              key={index}
              className={`bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg mx-2 my-2 ${
                selectedOption === option ? 'bg-teal-500' : 'bg-gray-700'
              }`}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mt-4 ${
              isPlaying ? 'bg-red-500' : ''
            }`}
            onClick={playPreview}
          >
            {isPlaying ? 'Pause Song' : 'Play Song'}
          </button>
        </div>
        {selectedOption !== '' && (
          <div className="mt-4 text-center">
            <p className={`text-2xl font-bold ${selectedOption === correctSong ? 'text-green-500' : 'text-red-500'}`}>
              {selectedOption === correctSong ? 'Correct!' : 'Wrong!'}
            </p>
            <p className="text-white">
              The correct song is {correctSong}.
            </p>
            {round < totalRounds ? (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-4"
                onClick={handleNextRound}
              >
                Next Round
              </button>
            ) : (
              <div>
                <p className="text-white text-xl font-bold mt-4">Final Score: {score}</p>
                <button
                  className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg mt-4 mr-2"
                  onClick={handleRestartGame}
                >
                  Try Again
                </button>
                <button
                  className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg mt-4"
                  onClick={handleLyricGuesserGame}
                >
                  Play Lyrics Guesser Game
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="text-white text-2xl mt-2 font-bold">
        Round: {round}
      </div>
      <div className="text-white text-2xl mt-2 font-bold">
        Score: {score}
      </div>
    </div>
  );
};

export default Game;
