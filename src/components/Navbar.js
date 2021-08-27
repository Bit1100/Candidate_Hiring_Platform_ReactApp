import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import bitLogo from "../img/Bit.jpg";
import { CandidateContext } from "../CandidateContext";

const Navbar = () => {
  // Extracting the data from the context api
  const { selected } = useContext(CandidateContext);
  return (
    <div className="p-2 bg-black text-white flex flex-center justify-between flex-wrap">
      <Link to="/">
        <img className="w-12 rounded-full" src={bitLogo} alt="BiT Logo" />
      </Link>
      <ul className="flex">
        <li className="text-lg md:text-2xl md:mx-2 p-1 hover:bg-yellow-600 rounded-md">
          <NavLink to="/" exact>
            Home
          </NavLink>
        </li>
        <li className="text-lg md:text-2xl md:mx-2 p-1 hover:bg-yellow-600 rounded-md">
          <NavLink to="/candidates">Students</NavLink>
        </li>
        <li className="text-lg md:text-2xl md:mx-2 p-1 hover:bg-yellow-600 rounded-md">
          <NavLink to="/selection">
            Selected -
            <span className="mx-2 bg-yellow-400 text-black rounded-full font-bold p-1">
              {selected.totalSelected}
            </span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
