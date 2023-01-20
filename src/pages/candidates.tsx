import React from "react";
import Candidates from "../components/Candidates";
import Footer from "../components/Footer";

const Students = () => {
  return (
    <>
      <div className="container mx-auto min-h-screen h-full">
        <Candidates />
      </div>
      <Footer />
    </>
  );
};

export default Students;
