"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import useSound from "use-sound";

import correctSound from "../../public/sounds/correct.mp3";
import clockSound from "../../public/sounds/clock.mp3";
import Footer from "./footer";

export default function Home() {
  const initialQuestions = [
    {
      question: "Quel est le plus grand animal terrestre ?",
      answers: ["Éléphant", "Girafe", "Hippopotame", "Rhinocéros"],
      correctAnswer: "Éléphant",
      image: "/questionsImages/elephant.png",
    },
    {
      question: "Combien de pattes a une araignée ?",
      answers: ["4", "6", "8", "10"],
      correctAnswer: "8",
      image: "/questionsImages/araignee.png",
    },
    {
      question: "Quel est le plus grand prédateur marin ?",
      answers: ["Requin blanc", "Orque", "Baleine", "Méduse"],
      correctAnswer: "Orque",
      image: "/questionsImages/orque.png",
    },
    {
      question:
        "Quel animal est connu pour changer de couleur selon son environnement ?",
      answers: ["Caméléon", "Panthère", "Poisson-clown", "Papillon"],
      correctAnswer: "Caméléon",
      image: "/questionsImages/cameleon.png",
    },
    {
      question: "Quel est le plus grand oiseau du monde ?",
      answers: ["Aigle", "Autruche", "Pingouin", "Condor"],
      correctAnswer: "Autruche",
      image: "/questionsImages/autruche.png",
    },
    {
      question: "Quel animal est le plus rapide sur terre ?",
      answers: ["Guepard", "Lion", "Zèbre", "Éléphant"],
      correctAnswer: "Guepard",
      image: "/questionsImages/guepard.png",
    },
    {
      question: "Quel serpent est connu pour sa capacité à cracher du venin ?",
      answers: ["Python", "Cobra", "Anaconda", "Vipère"],
      correctAnswer: "Cobra",
      image: "/questionsImages/cobra.png",
    },
    {
      question: "Quel est l'oiseau emblème des États-Unis ?",
      answers: ["Corbeau", "Hibou", "Aigle", "Colibri"],
      correctAnswer: "Aigle",
      image: "/questionsImages/aigle.png",
    },
  ];

  const [questions, setQuestions] = useState(initialQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timer, setTimer] = useState(5);
  const [highlightCorrectAnswer, setHighlightCorrectAnswer] = useState(false);
  const [quizEnded, setQuizEnded] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);

  const [playCorrectSound] = useSound(correctSound);
  const [playClockSound] = useSound(clockSound);

  const handleStartQuiz = () => {
    setTimer(5);
    setQuizStarted(true);
  };

  const handleNextQuestion = () => {
    setTimer(5);
    setHighlightCorrectAnswer(false);
    setSelectedAnswer(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz has ended
      setQuizEnded(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setTimer(5); // Reset timer to 5 seconds
    }
  };

  const handleRestartQuiz = () => {
    setQuestions(initialQuestions);
    setCurrentQuestion(0);
    setTimer(5);
    setHighlightCorrectAnswer(false);
    setQuizEnded(false);
    setSelectedAnswer(null);
  };

  const handleAnswerSelection = (selectedAnswer) => {
    if (!highlightCorrectAnswer && !quizEnded) {
      setSelectedAnswer(selectedAnswer);

      // Check if the selected answer is correct
      const isCorrect =
        selectedAnswer === questions[currentQuestion].correctAnswer;

      // Update state accordingly
      setHighlightCorrectAnswer(true);

      // Play sound effect based on correctness
      if (isCorrect) {
        playCorrectSound();
      }

      setTimeout(() => {
        // Move to the next question or end the quiz
        handleNextQuestion();
      }, 3000);
    }
  };

  useEffect(() => {
    let interval;

    if (quizStarted && timer > 0 && !quizEnded) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          // Play clock sound when timer reaches 3 seconds
          if (prevTimer === 3) {
            // Assuming you have a playClockSound function
            playClockSound();
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else if (quizStarted && !highlightCorrectAnswer && !quizEnded) {
      setHighlightCorrectAnswer(true);

      playCorrectSound();
      setTimeout(() => {
        // Move to the next question or end the quiz
        handleNextQuestion();
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [timer, currentQuestion, highlightCorrectAnswer, quizEnded, quizStarted]);

  const getAlphabet = (index) => {
    return String.fromCharCode(65 + index); // A: 65, B: 66, C: 67, D: 68, ...
  };

  return (
    <div className="font-pixelify bg-hero bg-cover h-fit bg-center flex justify-center">
      <div className="mt-1 lg:mt-20 mx-10 max-w-4xl w-10/12 md:w-full">
        {!quizStarted && (
          <div className="flex justify-center items-center h-screen">
            <Button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-6 rounded-full"
              onClick={handleStartQuiz}
            >
              Commence le Quiz
            </Button>
          </div>
        )}

        {quizStarted &&
          questions.map((question, index) => (
            <div
              key={index}
              className={`mb-3 lg:mb-8 ${
                currentQuestion === index ? "block" : "hidden"
              } ${quizEnded ? "animate-none" : ""}`}
            >
              {/* Question */}
              <div className="flex justify-center items-center h-28 mb-4 lg:mb-20">
                <div className="text-3xl lg:text-7xl rounded-full bg-indigo-800 text-white font-bold p-6 lg:p-10 w-6 h-6 lg:h-8 flex items-center justify-center mr-3 lg:mr-5">
                  {index + 1}
                </div>
                <h3 className="font-rubik p-0 text-center text-xl lg:text-4xl text-lime-400 lg:p-2 border-4 lg:border-6 border-indigo-800 rounded-3xl bg-indigo-950 bg-opacity-70">
                  {question.question}
                </h3>
              </div>
              {/* Image + Réponses */}
              <div className="flex flex-col lg:flex-row justify-between items-center">
                {/* Image */}
                <div className="border-4 lg:border-8 rounded-xl overflow-hidden mb-6 lg:mb-0">
                  <Image
                    src={question.image}
                    width={500}
                    height={100}
                    alt="GG"
                  />
                </div>
                {/* Réponses */}
                <div className="flex flex-col items-end w-full lg:w-2/3">
                  {question.answers.map((answer, answerIndex) => (
                    <Button
                      key={answerIndex}
                      className={`flex justify-start bg-white hover:bg-slate-200 text-black text-lg lg:text-2xl font-bold py-4 lg:py-7 px-1 mb-2 w-full lg:w-96 ${
                        highlightCorrectAnswer && selectedAnswer === answer
                          ? "bg-green-500 hover:bg-green-600 transform scale-110 jello-horizontal"
                          : ""
                      } ${
                        highlightCorrectAnswer &&
                        answer === question.correctAnswer
                          ? "bg-green-500 hover:bg-green-600 transform scale-110 jello-horizontal"
                          : ""
                      }`}
                      style={{
                        borderRadius: "50px",
                        backgroundColor:
                          highlightCorrectAnswer &&
                          answer !== question.correctAnswer &&
                          selectedAnswer === answer
                            ? "red"
                            : "",
                        opacity:
                          highlightCorrectAnswer &&
                          answer !== question.correctAnswer
                            ? "0.5"
                            : "1",
                      }}
                      onClick={() => handleAnswerSelection(answer)}
                    >
                      <div className="text-2xl lg:text-4xl rounded-full bg-indigo-800 text-white p-3 lg:p-6 w-6 lg:w-8 h-6 lg:h-8 flex items-center justify-center mr-3 lg:mr-5">
                        {getAlphabet(answerIndex)}
                      </div>
                      {answer}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ))}

        {quizStarted && (
          <div>
            {/* Timer */}
            <div className="w-full h-12 lg:h-20 border-8 relative bg-slate-800/70 rounded-full p-1">
              <div
                className="h-full w-full absolute top-0 left-0 rounded-full"
                style={{
                  width: `${(timer / 5) * 100}%`,
                  background: `
        repeating-linear-gradient(135deg, ${
          timer <= 2 ? "#E5484D" : "#30A46C"
        } 0 10px, ${timer <= 2 ? "#72232D" : "#20573E"} 25px 0) 0/100%
      `,
                }}
              ></div>
              <div className="h-full w-full absolute top-0 left-0 flex items-center justify-center text-white text-2xl lg:text-4xl font-bold">
                {timer}
              </div>
            </div>
            {/* Boutons de navigation */}
            <div className="flex justify-between mt-20 lg:mt-40">
              <Button
                className="bg-red-500 hover:bg-red-700 text-white font-bold p-6 rounded-full"
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0 || quizEnded}
              >
                Question Précédente
              </Button>
              <Button
                className="bg-green-500 hover:bg-green-700 text-white font-bold p-6 rounded-full"
                onClick={handleNextQuestion}
                disabled={currentQuestion === questions.length - 1 || quizEnded}
              >
                {quizEnded ? "Quiz Ended" : "Prochaine Question"}
              </Button>
            </div>

            {/* Restart Button */}
            <div className="flex justify-center">
              <Button
                className="bg-blue-500 hover.bg-blue-700 text-white font-bold p-6 rounded-full"
                onClick={handleRestartQuiz}
              >
                Recommencer le Quiz
              </Button>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}
