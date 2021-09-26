import React from "react";
import { useState, useContext } from "react";
import { CandidateContext } from "../CandidateContext";

const SingleCandidate = (props) => {
  // Exrracting the props data
  const { candidate, image } = props;
  const { id, name, email, website } = candidate;
  const [btnStatus, setBtnStatus] = useState(false);

  const { selected, setSelected } = useContext(CandidateContext);

  // adding users id to context state object so that it can be fetched even after the page refreshes
  const selectCandidate = (e, id) => {
    // Preventing from opening the specific user details and only focused on button
    e.preventDefault();

    // Cloning the actual data
    let _selected = { ...selected };

    // Initializing individaul with empty array
    !_selected.individuals.individual &&
      (_selected.individuals.individual = []);

    // Creating the local object
    let candidObject = {};
    !candidObject["id"] && (candidObject["id"] = id);

    // Pushing the candid object only if it doesn't exist previously
    if (!_selected.individuals.individual.some((e) => e["id"] === id)) {
      _selected.individuals.individual.push(candidObject);

      _selected.totalSelected += 1;
    }

    if (!btnStatus) {
      setBtnStatus(true);
    }

    // FInding and Removing the individual data on 2nd click from the localStorage
    else {
      setBtnStatus(false);
      const index = _selected.individuals.individual.findIndex(
        (obj) => obj["id"] === id
      );
      _selected.individuals.individual.splice(index, 1);
      _selected.totalSelected -= 1;
      _selected.totalSelected < 0 && (_selected.totalSelected = 0);
      setSelected(_selected);
      return;
    }

    setSelected(_selected);
  };

  // checks whether the individuals is empty or not in localStorage
  const isSelected = () => {
    return (selected.individuals &&
      Object.keys(selected.individuals).length === 0 &&
      selected.individuals.constructor === Object) ||
      selected.individuals.individual.length === 0
      ? ""
      : 1;
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
          onClick={(e) => selectCandidate(e, id)}
          className={
            // if no candidate is present then normal className will be assigned but if present then based on the match className will be assigned
            !isSelected()
              ? "bg-yellow-400 border-2 border-black px-1 rounded-md text-xl"
              : selected.individuals.individual.map((item) => {
                  return item["id"] === id
                    ? "bg-blue-400 text-white font-bold border-2 border-black px-1 rounded-md text-xl after:content-['ed] after:block text-2xl"
                    : "bg-blue-400 border-2 border-black px-1 rounded-md text-2xl";
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
