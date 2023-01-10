import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCandidate, fetchSelectedCandidatesById } from "../redux/";

const SingleCandidate = (props) => {
  // Exrracting the props data
  const { candidate, image } = props;
  const { id, name, email, website } = candidate;
  const dispatch = useDispatch();
  const candidates = useSelector(
    (state) => state.selectedCandidates.candidates
  );

  // checks whether the individuals is empty or not in localStorage
  const isSelected = () => {
    return candidates.length === 0 ? "" : 1;
  };

  return (
    <div
      className="w-96 h-96 md:w-80 xl:w-96 xl:h-96 flex flex-col justify-center border-4 my-2 bg-green-300 rounded-xl my-8"
      key={id}
    >
      <div className="my-4 flex flex-col items-center">
        <img
          className="w-36 h-36 m-4 rounded-full"
          src={image}
          alt="Candidate"
        />
        <div className="text-3xl m-1 ">{name}</div>
        <a href={`mailto:${email}`} className="text-xl m-1 hover:underline">
          {email}
        </a>
      </div>
      <div className="px-4 mt-2 text-2xl flex items-center justify-between">
        <a
          href={`http://${website}`}
          target="_blank"
          rel="noreferrer"
          className="hover:underline text-2xl"
        >
          {website}
        </a>
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(selectCandidate(id));
            dispatch(fetchSelectedCandidatesById(id));
          }}
          className={
            // if no candidate is present then normal className will be assigned but if present then based on the match className will be assigned
            !isSelected()
              ? "bg-yellow-400 border-2 border-black px-1 rounded-md text-xl"
              : candidates.map((item) => {
                  return item["id"] === id
                    ? "bg-blue-400 text-white font-bold border-2 border-white px-1 rounded-md text-xl after:content-['ed] after:block text-2xl"
                    : "bg-blue-400 border-1 border-2 black px-2 border-black rounded-md text-xl";
                })
          }
        >
          Select
        </button>
      </div>
    </div>
  );
};

export default SingleCandidate;
