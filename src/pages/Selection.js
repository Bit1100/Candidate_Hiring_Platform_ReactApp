import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import { deleteCandidate } from "../redux/";

const Selection = () => {
  const dispatch = useDispatch();
  const selectedCandidates = useSelector(
    (state) => state.selectedCandidates.candidatesDetail.candidates
  );

  return (
    <>
      <section className="pt-8 min-w-screen min-h-screen w-full h-full flex flex-col max-w-full max-h-full bg-green-500">
        <h1 className="border-4 border-brown w-max mx-auto p-2 rounded-xl px-4 text-center bg-yellow-600 text-yellow-300 font-bold text-3xl md:text-5xl lg:text-6xl drop-shadow-lg">
          Selected Candidates
        </h1>
        <ul className="container mx-auto w-full h-full py-16 grid place-items-center">
          {selectedCandidates?.map((user, index) => {
            const { id, name, email, website } = user;
            return (
              <li
                key={id}
                className="w-full lg:w-3/4 mx-auto bg-yellow-200 m-8 rounded-xl p-2 flex flex-wrap text-xl justify-center items-center md:justify-between md:items-center"
              >
                <div className="text-black rounded-xl p-1 m-2">{id}</div>
                <span className="text-black rounded-xl p-1 m-2">{name}</span>
                <a
                  href={`mailto:${email}`}
                  className="hover:underline text-black rounded-xl p-1 m-2"
                >
                  {email}
                </a>
                <axl
                  href={`http://${website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline text-black rounded-xl p-1 m-2"
                >
                  {website}
                </axl>
                <button
                  className="text-black rounded-xl p-1 m-2 text-xl px-4 bg-red-400 text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(deleteCandidate(id));
                  }}
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
