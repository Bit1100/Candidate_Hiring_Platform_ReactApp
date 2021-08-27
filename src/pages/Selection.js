import { useEffect, useContext, useState } from "react";
import { CandidateContext } from "../CandidateContext";
import Footer from "../components/Footer";

const Selection = () => {
  // Creating a local state
  const [candidate, setCandidate] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  // Extracting the context data via context API
  const { selected, setSelected } = useContext(CandidateContext);

  // Cloning the actual data to make modification
  const _selectedUser = { ...selected };

  // Deleting the selected user both from UI and localStorage
  const deleteCandidate = (e, id) => {
    const index = _selectedUser.individuals.individual.findIndex(
      (obj) => obj.id === id
    );
    _selectedUser.individuals.individual.splice(index, 1);
    _selectedUser.totalSelected -= 1;
    setSelected(_selectedUser);
    setCandidate(candidate.filter((candid) => candid.id !== id));
  };

  // Running useEffect only when selecting new user
  useEffect(() => {
    // Returning on no candidates selected
    if (!_selectedUser.individuals.individual) {
      return;
    }

    if (isDataFetched) {
      return;
    }

    // Self-Calling function to make number of fetch request to get all the users fresh data via ids stored in the localStorage
    (() => {
      _selectedUser.individuals.individual.forEach(async (item) => {
        const id = item["id"];

        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );

        const user = await response.json();

        setIsDataFetched(true);

        // Concatenating the user into the local state using concat() or spread operator
        setCandidate((candidate) => candidate.concat(user));
      });
    })();
  }, [_selectedUser.individuals.individual, isDataFetched]);

  return (
    <>
      <section className="pt-8 min-w-screen min-h-screen w-full h-full flex flex-col max-w-full max-h-full bg-green-500">
        <h1 className="border-4 border-brown w-max mx-auto p-2 rounded-xl px-4 text-center bg-yellow-600 text-yellow-300 font-bold text-6xl drop-shadow-lg">
          Selected Candidates
        </h1>
        <ul className="container mx-auto w-full h-full py-16 grid place-items-center">
          {candidate.map((user, index) => {
            const { id, name, email, website } = user;
            return (
              <li
                key={id}
                className="w-full lg:w-3/4 mx-auto bg-yellow-200 m-8 rounded-xl p-2 flex flex-wrap text-xl justify-center items-center md:justify-between md:items-center"
              >
                <div className="text-black rounded-xl p-1 m-2">{index + 1}</div>
                <span className="text-black rounded-xl p-1 m-2">{name}</span>
                <a
                  href={`mailto:${email}`}
                  className="hover:underline text-black rounded-xl p-1 m-2"
                >
                  {email}
                </a>
                <a
                  href={`http://${website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline text-black rounded-xl p-1 m-2"
                >
                  {website}
                </a>
                <button
                  className="text-black rounded-xl p-1 m-2 text-xl px-4 bg-red-400 text-white"
                  onClick={(e) => deleteCandidate(e.target, id)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </section>
      <Footer />
    </>
  );
};

export default Selection;
