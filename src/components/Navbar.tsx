import { Link, NavLink } from "react-router-dom";
import bitLogo from "../assets/images/Bit.jpg";
import { useAppSelector } from "../store/hooks";

const Navbar = () => {
  const totalSelected = useAppSelector(
    (state) => state.selectedCandidates.totalSelected
  );
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
          <NavLink to="/candidates">Candidates</NavLink>
        </li>
        <li className="text-lg md:text-2xl md:mx-2 p-1 hover:bg-yellow-600 rounded-md">
          <NavLink to="/selection">
            Selected -
            <span className="mx-2 bg-yellow-400 text-black rounded-full font-bold p-1">
              {totalSelected}
            </span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
