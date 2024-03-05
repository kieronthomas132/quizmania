
//Context API for quiz options
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface OptionsProps {
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
  category: number;
  setCategory: Dispatch<SetStateAction<number>>;
  difficulty: string;
  setDifficulty: Dispatch<SetStateAction<string>>;
  type: string;
  setType: Dispatch<SetStateAction<string>>;
}

export const OptionsContext = createContext<OptionsProps | undefined>(
  undefined,
);

export const useOptionsContext = () => {
  const context = useContext(OptionsContext);

  if (!context) {
    throw Error("useOptionsContext must be used in a OptionsContextProvider");
  }
  return context;
};

export const OptionsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [amount, setAmount] = useState<number>(10);
  const [category, setCategory] = useState(9);
  const [difficulty, setDifficulty] = useState("easy");
  const [type, setType] = useState("Multiple Choice");

  return (
    <OptionsContext.Provider
      value={{
        amount,
        setAmount,
        category,
        setCategory,
        type,
        setType,
        difficulty,
        setDifficulty,
      }}
    >
      {children}
    </OptionsContext.Provider>
  );
};
