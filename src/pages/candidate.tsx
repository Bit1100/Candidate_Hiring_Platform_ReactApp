import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useHistory, useParams } from "react-router-dom";
import { imgGallery } from "../components/Candidates";
import { fetchCandidateById } from "../store";
import { IdParam } from "../types";

const Candidate = () => {
  const candidate = useAppSelector((state) => state.candidates.candidate);
  const dispatch = useAppDispatch();

  const { name, phone, email, website, address, company } = candidate;

  // Extracting the data from the url using useParams() method
  const { id } = useParams<IdParam>();

  const userId = Number(id);

  // const id  = params.id;
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchCandidateById(userId));
  }, [userId, dispatch]);

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
            src={imgGallery[userId - 1]}
            className="w-64 h-64 xl:w-96 xl:h-96 rounded-full mb-12"
            alt="Suraj Keshari"
          />
          <div className="ml-8 lg:ml-16 text-2xl ">
            <div className="font-bold">Name - {name}</div>
            <div className="hover:underline">E-mail - {email}</div>
            <div>Phone - {phone}</div>
            <div>Address - {address} City</div>
            <div>Company - {company} Pvt. Limited</div>
            <div className="hover:underline">Website - {website}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Candidate;
