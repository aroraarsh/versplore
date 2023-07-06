import React, { useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';
import { FiCheck, FiX } from 'react-icons/fi';
import 'tailwindcss/tailwind.css';
import { Link, useLocation } from "react-router-dom";

const QuizPage = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionData, setQuestionData] = useState(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [optionClassName, setOptionClassName] = useState('');

  const location = useLocation();
  const genre = new URLSearchParams(location.search).get("genre");

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    const isAnswerCorrect = selectedAnswer === questionData.correct_song;
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setShowResult(true);
  };

  const handleNextQuestion = () => {
    setQuestionData(null);
    setSelectedAnswer(null);
    setShowResult(false);
    setOptionClassName('');

    if (round === 10) {
      alert(`Game Over! Your score is ${score}/10`);
      setScore(0);
      setRound(1);
    } else {
      setRound((prevRound) => prevRound + 1);
    }
  };

  const shuffleOptions = (options) => {
    const shuffledOptions = [...options];
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOptions[i], shuffledOptions[j]] = [
        shuffledOptions[j],
        shuffledOptions[i],
      ];
    }
    return shuffledOptions;
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/game/${genre}`);
        const data = await response.json();
        const shuffledOptions = shuffleOptions(data.options);
        setQuestionData({ ...data, options: shuffledOptions });
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    fetchQuestion();
  }, [genre, round]);

  useEffect(() => {
    setOptionClassName('');
  }, [questionData]);

  const handleOptionSelect = (option) => {
    if (showResult || !questionData) {
      return;
    }

    setSelectedAnswer(option);
    setOptionClassName(
      option === questionData.correct_song ? 'correct' : 'incorrect'
    );
  };

  useEffect(() => {
    if (showResult) {
      const timer = setTimeout(() => {
        handleNextQuestion();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showResult]);

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-900 py-4 px-8 flex items-center">
        <Link to="/" className="text-white text-lg font-bold">
          Versplore
        </Link>
        <div className="flex-grow"></div>
        <div className="flex items-center space-x-2 text-white">
          <p className="text-lg">Score:</p>
          <p className="text-2xl font-bold">{score}</p>
        </div>
      </nav>
      <div className="max-w-md w-full mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Quiz</h2>

        {questionData && (
          <Transition
            in={!showResult}
            timeout={300}
            mountOnEnter
            unmountOnExit
          >
            {(state) => (
              <div
                className={`transition-opacity duration-300 ${
                  state === 'exited' ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <div className="bg-gray-900 rounded-lg p-4 mb-6">
                  {Array.isArray(questionData.lyrics) ? (
                    questionData.lyrics.map((line, index) => (
                      <p
                        key={index}
                        className="text-lg mb-2 text-white font-bold"
                        style={{ fontFamily: 'Gotham Black, sans-serif' }}
                      >
                        {line}
                      </p>
                    ))
                  ) : (
                    <p className="text-lg">{questionData.lyrics}</p>
                  )}
                </div>
                <ul className="space-y-2">
                  {questionData.options.map((option, index) => {
                    const isOptionSelected = selectedAnswer === option;
                    const isOptionCorrect =
                      option === questionData.correct_song;
                    const optionClassName = isOptionSelected
                      ? isCorrect
                        ? isOptionCorrect
                          ? 'correct'
                          : 'incorrect'
                        : ''
                      : '';
                    return (
                      <li key={index}>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            value={option}
                            checked={selectedAnswer === option}
                            onChange={() => handleOptionSelect(option)}
                            className="form-radio text-green-500 h-4 w-4"
                          />
                          <span className={`ml-2 ${optionClassName}`}>
                            {option}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>

                <button
                  onClick={handleSubmitAnswer}
                  className="bg-teal-500 hover:bg-green-600 text-white font-bold py-2 px-4 mt-6 rounded transition-colors duration-300"
                >
                  Submit
                </button>
              </div>
            )}
          </Transition>
        )}

        {showResult && (
          <Transition
            in={showResult}
            timeout={300}
            mountOnEnter
            unmountOnExit
          >
            {(state) => (
              <div
                className={`transition-opacity duration-300 ${
                  state === 'exited' ? 'opacity-0' : 'opacity-100'
                }`}
              >
                {isCorrect ? (
                  <div className="flex items-center text-green-500 mb-6">
                    <FiCheck className="mr-2" />
                    <span>Correct answer!</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-500 mb-6">
                    <FiX className="mr-2" />
                    <span>Incorrect answer.</span>
                  </div>
                )}
              </div>
            )}
          </Transition>
        )}

        {!showResult && !questionData && (
          <div className="text-center mt-6">
            <p>Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
