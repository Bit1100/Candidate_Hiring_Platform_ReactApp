import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const Candidate = () => {
  const [candidate, setCandidate] = useState({});

  // Extracting the data from the url using useParams() method
  const { id, image } = useParams();
  const history = useHistory();

  useEffect(() => {
    // Self-calling function to fetch data from 3rd party API
    (async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );

      const user = await response.json();

      user["address"] = user.address.city;
      user["company"] = user.company.name;

      setCandidate(user);
    })();
  }, [id]);

  // Method for going back to the previous page
  const goBackward = () => history.goBack();

  return (
    <>
      <div className="min-h-screen">
        <button
          onClick={() => goBackward()}
          className="m-16 mb-0 p-2 px-6 bg-black text-4xl text-white rounded-xl"
        >
          &lt;- Back
        </button>
        <div className="border-8 border-black w-11/12 lg:w-3/4 xl:w-max p-8 mt-16 bg-green-300 rounded-xl flex flex-wrap lg:flex-nowrap items-center justify-center container mx-auto ">
          <img
            src={`/images/${image}`}
            className="w-64 h-64 xl:w-96 xl:h-96 rounded-full mb-12"
            alt="Suraj Keshari"
          />
          <div className="ml-8 lg:ml-16 text-2xl ">
            <div className="font-bold">Name - {candidate.name}</div>
            <div className="hover:underline">E-mail - {candidate.email}</div>
            <div className="">Phone - {candidate.phone}</div>
            <div className="">Address - {candidate.address} City</div>
            <div className="">Company - {candidate.company} Pvt. Limited</div>
            <div className="hover:underline">Website - {candidate.website}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Candidate;
