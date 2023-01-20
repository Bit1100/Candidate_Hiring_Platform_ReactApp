import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchCandidates } from "../store";

import SingleCandidate from "./SingleCandidate";
import s1 from "../assets/images/s1.jpg";
import s2 from "../assets/images/s2.jpg";
import s3 from "../assets/images/s3.jpg";
import s4 from "../assets/images/s4.jpg";
import s5 from "../assets/images/s5.jpg";
import s6 from "../assets/images/s6.jpg";
import s7 from "../assets/images/s7.jpg";
import s8 from "../assets/images/s8.jpg";
import s9 from "../assets/images/s9.jpg";
import s10 from "../assets/images/s10.jpg";

export const imgGallery = [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10];

const Candidates = () => {
  const candidates = useAppSelector((state) => state.candidates.candidates);
  const dispatch = useAppDispatch();

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
