import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryProvider } from "./components/lib/react-query/QueryProvider.tsx";
import {BrowserRouter} from "react-router-dom";
import {ScoreContextProvider} from "./components/context/scoreContext.tsx";
import {OptionsContextProvider} from "./components/context/optionsContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScoreContextProvider>
        <OptionsContextProvider>
          <QueryProvider>
            <App />
          </QueryProvider>
        </OptionsContextProvider>
      </ScoreContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
