import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useScoreContext } from "../context/scoreContext.tsx";

interface QuizProps {
  quizQuestions: Array<{
    type: string;
    difficulty: string;
    category: string;
    correct_answer: string;
    incorrect_answers: string[];
    question: string;
  }>;
}


const QuizOptions = ({ quizQuestions }: QuizProps) => {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState("");
  const [answered, setAnswered] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const { score, setScore } = useScoreContext();

  //Array of both correct answer and incorrect answers
  const allAnswers = [
    quizQuestions[questionIndex]?.correct_answer,
    ...(quizQuestions[questionIndex]?.incorrect_answers || []),
  ];

  //Shuffle all answer options
  const shuffledAnswers = allAnswers.sort(() => (Math.random() > .5) ? 1 : -1)


  //Check to see if the length of questions is equal to question index
  useEffect(() => {
    if (questionIndex === quizQuestions.length && quizQuestions.length > 0) {
      navigate("/score");
    }
  }, [questionIndex, quizQuestions, navigate]);


  //function to handle answer selection,
  //if correct answer is picked increase score
  const handleAnswerSelection = (selectedAnswer: string) => {
    setAnswer(selectedAnswer);
    const correctAnswer = quizQuestions[questionIndex]?.correct_answer;
    setAnswered(true);
    if (selectedAnswer === correctAnswer) {
      setScore((prevScore) => prevScore + 10);
    }
  };

  //if question is answered, move on to next question
  const handleNextQuestion = () => {
    setAnswer("");
    setAnswered(false);
    setQuestionIndex((prevIndex) => prevIndex + 1);
  };

  if (!quizQuestions.length) {
    return null; // If there are no questions yet, return null or any placeholder component
  }


  return (
    <div className="flex flex-col items-center">
      <h2 className='text-center'>{quizQuestions[questionIndex]?.question}</h2>
      <div className="flex flex-wrap w-full justify-center gap-2 my-[15px] items-center">
        {shuffledAnswers.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleAnswerSelection(option)}
            disabled={answered}

            className={
              answered &&
              option === quizQuestions[questionIndex]?.correct_answer
                ? "bg-green-600"
                : answered && option === answer
                  ? "bg-red-500"
                  : ""
            }
          >
            {option}
          </Button>
        ))}
      </div>
      {answered && <Button onClick={handleNextQuestion}>Next Question</Button>}
      <h3 className="mt-[20px]">Score: {score}</h3>
    </div>
  );
};

export default QuizOptions;
