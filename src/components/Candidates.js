import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCandidates } from "../redux/";

import SingleCandidate from "./SingleCandidate";
import s1 from "../img/s1.jpg";
import s2 from "../img/s2.jpg";
import s3 from "../img/s3.jpg";
import s4 from "../img/s4.jpg";
import s5 from "../img/s5.jpg";
import s6 from "../img/s6.jpg";
import s7 from "../img/s7.jpg";
import s8 from "../img/s8.jpg";
import s9 from "../img/s9.jpg";
import s10 from "../img/s10.jpg";

export const imgGallery = [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10];

const Candidates = () => {
  const candidates = useSelector((state) => state.candidates.candidates);
  const dispatch = useDispatch();

  // fetching data from the 3rd party API and populating DOM
  useEffect(() => {
    dispatch(fetchCandidates());
  }, [dispatch]);

  return (
    <>
      <h3 className="border-4 border-brown w-max mx-auto p-2 rounded-xl px-4 text-center bg-black my-20 text-yellow-300 font-bold text-6xl drop-shadow-lg">
        Candidates
      </h3>
      <div className="container mx-auto my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
        {candidates.map((singleCandidate, index) => {
          return (
            <Link to={`/candidates/${singleCandidate.id}`}>
              <SingleCandidate
                key={singleCandidate.id}
                candidate={singleCandidate}
                image={imgGallery[index]}
              />
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Candidates;
