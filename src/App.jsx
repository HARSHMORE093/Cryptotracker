import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import { Homepage } from "./pages/homepage";
import { CoinsPage } from "./pages/CoinsPage";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const theme = useStyles();

  return (
    <>
      <div className={theme.App}>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} exact />
          <Route path="/coins/:id" element={<CoinsPage />} exact/>
        </Routes>
      </div>
    </>
  );
}

export default App;
