// Importing various functionalities from the modules
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Selection from "./pages/selection";
import Students from "./pages/students";
import Candidate from "./pages/candidate";
import "./css/style.css";
import { CandidateContextProvider } from "./CandidateContext";
import { getCandidate, setCandidate } from "./Utils/storage";

// Main Component of the App
const App = () => {
  // Initializing the state available for various sub-components
  const [selected, setSelected] = useState({
    individuals: {},
    totalSelected: 0,
  });

  // Getting the data from localStorage on Page Refresh
  useEffect(() => {
    setSelected(getCandidate());
  }, []);

  // Storing the new data into the localStorage
  useEffect(() => {
    setCandidate(selected);
  }, [selected]);

  return (
    <>
      <Router>
        {/* Making state data available to various components via context api */}
        <CandidateContextProvider value={{ selected, setSelected }}>
          <Navbar />
          <Switch>
            <Route path="/" component={Home} exact></Route>
            <Route path="/candidates" exact component={Students}></Route>
            <Route path="/candidates/:id" component={Candidate}></Route>
            <Route path="/selection" component={Selection}></Route>
            <Redirect to="/" />
          </Switch>
        </CandidateContextProvider>
      </Router>
    </>
  );
};

export default App;
