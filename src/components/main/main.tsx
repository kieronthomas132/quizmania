import {
  useGetCategories,
  useGetQuizQuestions,
} from "../lib/react-query/queries&Mutations.tsx";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import QuizOptions from "../quiz/quizOptions.tsx";
import { useOptionsContext } from "../context/optionsContext.tsx";

interface Categories {
  id: number;
  name: string;
}

const Main = () => {

  const {
    amount,
    category,
    difficulty,
    type,
    setAmount,
    setCategory,
    setType,
    setDifficulty,
  } = useOptionsContext();


  const [hasQuizStarted, setHasQuizStarted] = useState(false);
  const { mutateAsync: getQuizQuestions } = useGetQuizQuestions();
  const [quizQuestions, setQuizQuestions] = useState([]);
  const { data: categories } = useGetCategories();

  //fetch quiz questions based on options picked and start quiz
  const handleGetQuizQuestions = async () => {
    try {
      const quizQuestions = await getQuizQuestions({
        amount,
        category,
        difficulty,
        type,
      });
      setQuizQuestions(quizQuestions);
      setHasQuizStarted(!hasQuizStarted);
      return quizQuestions;
    } catch (error) {
      throw Error("Error fetching quiz questions:");
    }
  };

  return (
    <div className="bg-[#1C1C1C] flex items-center flex-col justify-center h-[100vh] text-[#DBDBDB] font-inter font-[600]">
      {!hasQuizStarted ? (
        <>
          <h1 className="text-[6vw]">Quizmania</h1>

          {/*SELECT NUMBER OF QUESTIONS INPUT*/}

          <label className="text-start md:w-[29%] my-3">
            Number of questions:
          </label>
          <input
            className="focus:outline-none w-[87%] md:w-[30%] p-2.5 text-sm rounded-full bg-[#282828] text-[#9F9F9F]"
            defaultValue={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
          />

          {/*SELECT CATEGORY*/}

          <label className="text-start md:w-[29%]  my-3">
            Select Category:
          </label>
          <select
            defaultValue={category}
            onChange={(e) => setCategory(parseInt(e.target.value))}
            className="focus:outline-none p-2.5 text-sm md:w-[30%] w-[87%] rounded-full bg-[#282828] text-[#9F9F9F]"
          >
            {categories &&
              categories.trivia_categories &&
              categories.trivia_categories.map((category: Categories) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>

          {/*SELECT DIFFICULTY*/}

          <label className="text-start md:w-[29%]  my-3">
            Select Difficulty:
          </label>
          <select
            defaultValue={difficulty}
            onChange={(e) => setDifficulty(e.target.value.toLowerCase())}
            className="focus:outline-none p-2.5 text-sm md:w-[30%] w-[87%] rounded-full bg-[#282828] text-[#9F9F9F]"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

          {/*SELECT TYPE */}

          <label className="text-start md:w-[29%]  my-3">Select Type:</label>
          <select
            defaultValue={type}
            onChange={(e) => setType(e.target.value.toLowerCase())}
            className="focus:outline-none p-2.5 text-sm md:w-[30%] w-[87%] rounded-full bg-[#282828] text-[#9F9F9F]"
          >
            <option>Multiple Choice</option>
            <option>True/False</option>
          </select>

          <Button
            onClick={handleGetQuizQuestions}
            size="sm"
            className="mt-[20px] bg-[#37996B] font-[400] text-[#FFFFFF] border border-[#3DCF8E]"
          >
            Start Quiz
          </Button>
        </>
      ) : (
        <QuizOptions quizQuestions={quizQuestions} />
      )}
    </div>
  );
};

export default Main;
