
//Score context to keep track of score across components

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

export interface Score {
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
}
export const ScoreContext = createContext<Score | undefined>(undefined);

export const useScoreContext = () => {
  const context = useContext(ScoreContext);

  if (!context) {
    throw Error("ScoreContext must be used in a ScoreContextProvider");
  }
  return context;
};

export const ScoreContextProvider = ({ children }: { children: ReactNode }) => {
  const [score, setScore] = useState(0);

  return (
    <ScoreContext.Provider value={{ score, setScore }}>
      {children}
    </ScoreContext.Provider>
  );
};
