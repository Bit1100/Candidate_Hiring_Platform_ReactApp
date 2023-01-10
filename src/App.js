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
import Candidates from "./pages/candidates";
import Candidate from "./pages/candidate";
import "./css/style.css";
import { getCandidate, setCandidate } from "./Utils/";
import { useDispatch } from "react-redux";
import { savedCandidates } from "./redux/";

// Main Component of the App
const App = () => {
  const dispatch = useDispatch();

  const candidates = useSelector(
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
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" component={Home} exact></Route>
          <Route path="/candidates" exact component={Candidates}></Route>
          <Route path="/candidates/:id" component={Candidate}></Route>
          <Route path="/selection" component={Selection}></Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
};

export default App;
