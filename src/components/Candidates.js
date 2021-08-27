import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SingleCandidate from "./SingleCandidate";
const imgGallery = [
  "/images/suraj.jpg",
  "/images/suraj2.jpg",
  "/images/suraj3.jpg",
  "/images/suraj4.jpg",
  "/images/suraj5.jpg",
  "/images/surajl.jpg",
  "/images/smartsun.jpg",
  "/images/currentSun.jpg",
  "/images/happySun.jpg",
  "/images/heavySun.jpg",
];

const Candidates = () => {
  const [individual, setIndividual] = useState([]);

  // fetching data from the 3rd party API and populating DOM
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
        setIndividual(users);
      });
  }, []);

  return (
    <>
      <h3 className="border-4 border-brown w-max mx-auto p-2 rounded-xl px-4 text-center bg-black my-20 text-yellow-300 font-bold text-6xl drop-shadow-lg">
        Candidates
      </h3>
      <div className="container mx-auto my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
        {individual.map((singleCandidate, index) => {
          return (
            <Link
              to={`/candidates/${singleCandidate.id}/${imgGallery[index].slice(
                8
              )}`}
            >
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
