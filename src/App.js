import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Selection from "./pages/selection";
import Students from "./pages/students";
import Candidate from "./pages/candidate";
import "./css/style.css";
import { setCandidate } from "./Utils/storage";

// Main Component of the App
const App = () => {
  const candidates = useSelector(
    (state) => state.selectedCandidates.candidatesDetail.candidates
  );

  // Getting the data from localStorage on Page Refresh
  // useEffect(() => {
  //   getCandidate();
  // }, []);

  // Storing the new data into the localStorage
  useEffect(() => {
    setCandidate(candidates);
  }, [candidates]);

  return (
    <>
      <Router>
        {/* Making state data available to various components via context api */}
        <Navbar />
        <Switch>
          <Route path="/" component={Home} exact></Route>
          <Route path="/candidates" exact component={Students}></Route>
          <Route path="/candidates/:id" component={Candidate}></Route>
          <Route path="/selection" component={Selection}></Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
};

export default App;
