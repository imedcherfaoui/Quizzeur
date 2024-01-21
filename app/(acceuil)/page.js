"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Footer from "./footer";

export default function Home() {
  const initialQuestions = [
    {
      question: "Quel est le nom de la capitale de la France ?",
      answers: ["Paris", "Lyon", "Marseille", "Toulouse"],
      correctAnswer: "Paris",
      image: "/questionsImages/paris.png",
    },
    {
      question: "Quel est le nom de la capitale de l'Espagne ?",
      answers: ["Madrid", "Barcelone", "Valence", "Séville"],
      correctAnswer: "Madrid",
      image: "/questionsImages/paris.png",
    },
  ];

  const [questions, setQuestions] = useState(initialQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timer, setTimer] = useState(8);
  const [highlightCorrectAnswer, setHighlightCorrectAnswer] = useState(false);
  const [quizEnded, setQuizEnded] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleNextQuestion = () => {
    setTimer(8);
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
      setTimer(8); // Reset timer to 8 seconds
    }
  };

  const handleRestartQuiz = () => {
    setQuestions(initialQuestions);
    setCurrentQuestion(0);
    setTimer(8);
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

      setTimeout(() => {
        // Move to the next question or end the quiz
        handleNextQuestion();
      }, 3000);
    }
  };

  useEffect(() => {
    let interval;

    if (timer > 0 && !quizEnded) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (!highlightCorrectAnswer && !quizEnded) {
      setHighlightCorrectAnswer(true);

      setTimeout(() => {
        // Move to the next question or end the quiz
        handleNextQuestion();
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [timer, currentQuestion, highlightCorrectAnswer, quizEnded]);

  const getAlphabet = (index) => {
    return String.fromCharCode(65 + index); // A: 65, B: 66, C: 67, D: 68, ...
  };

  return (
    <div className="font-pixelify bg-hero h-screen bg-cover bg-center flex justify-center">
      <div className="mt-10 lg:mt-20 mx-10 max-w-4xl w-full">
        {questions.map((question, index) => (
          <div
            key={index}
            className={`mb-8 ${
              currentQuestion === index ? "block" : "hidden"
            } ${quizEnded ? "animate-none" : ""}`}
          >
            {/* Question */}
            <div className="flex justify-center items-center mb-8 lg:mb-20">
              <div className="text-7xl rounded-full bg-indigo-800 text-white font-bold p-10 w-6 h-6 lg:h-8 flex items-center justify-center mr-3 lg:mr-5">
                {index + 1}
              </div>
              <h3 className="text-center text-4xl lg:text-6xl text-yellow-300 p-2 border-4 lg:border-6 border-indigo-800 rounded-xl bg-indigo-950 bg-opacity-50">
                {question.question}
              </h3>
            </div>
            {/* Image + Réponses */}
            <div className="flex flex-col lg:flex-row justify-between items-center">
              {/* Image */}
              <div className="border-4 lg:border-8 rounded-xl overflow-hidden mb-6 lg:mb-0">
                <Image src={question.image} width={500} height={100} alt="GG" />
              </div>
              {/* Réponses */}
              <div className="flex flex-col items-end w-full lg:w-2/3">
                {question.answers.map((answer, answerIndex) => (
                  <Button
                    key={answerIndex}
                    className={`flex justify-start bg-white hover:bg-slate-200 text-black text-lg lg:text-2xl font-bold py-4 lg:py-7 px-1 mb-2 w-full lg:w-96 ${
                      highlightCorrectAnswer && selectedAnswer === answer
                        ? "bg-green-500 hover:bg-green-600 transform scale-110"
                        : ""
                    } ${
                      highlightCorrectAnswer &&
                      answer === question.correctAnswer
                        ? "bg-green-500 hover:bg-green-600 transform scale-110"
                        : ""
                    }`}
                    style={{
                      borderRadius: "25px 10px 10px 25px",
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

        {/* Timer */}
        <div className="w-full h-12 lg:h-20 border-2 relative rounded-md p-1">
          <div
            className="h-full w-full absolute top-0 left-0 bg-green-500 rounded-md"
            style={{ width: `${(timer / 8) * 100}%` }}
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-6 rounded-full"
            onClick={handleRestartQuiz}
          >
            Restart Quiz
          </Button>
        </div>

        <Footer />
      </div>
    </div>
  );
}
