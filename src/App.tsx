import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Selection from "./pages/selection";
import Candidates from "./pages/candidates";
import Candidate from "./pages/candidate";
import "./assets/styles/style.css";
import { getCandidate, setCandidate } from "./utils";
import { savedCandidates } from "./store";

// Main Component of the App
const App = () => {
  const dispatch = useAppDispatch();

  const candidates = useAppSelector(
    (state) => state.selectedCandidates.candidatesDetail.candidates
  );

  // Getting the data from localStorage on Page Refresh
  useEffect(() => {
    dispatch(savedCandidates(getCandidate()));
  }, [dispatch]);

  // Storing the new data into the localStorage
  useEffect(() => {
    setCandidate(candidates);
  }, [candidates]);

  return (
    <Router
      basename={
        process.env.REACT_APP_STAGE === "production"
          ? process.env.PUBLIC_URL
          : ""
      }
    >
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact></Route>
        <Route path="/candidates" exact component={Candidates}></Route>
        <Route path="/candidates/:id" component={Candidate}></Route>
        <Route path="/selection" component={Selection}></Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
