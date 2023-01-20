import suraj from "../assets/images/surajl.jpg";

const About = () => {
  return (
    <div className="w-full h-screen border-yellow border-10 container mx-auto grid grid-cols-1 p-5 md:grid-cols-2">
      <div className="p-5 flex flex-col justify-center">
        <h2 className="my-2 text-4xl md:text-5xl xl:text-7xl xl:my-8 text-black underline 600 font-bold">
          Candidate Hiring Platform
        </h2>
        <p className="my-4 text-2xl xl:text-3xl xl:my-4 leading-relaxed tracking-wide">
          Best Place to Get Hired. The easy bridge between the
          <strong> Companies</strong> and the
          <strong> IT Job Seeking Candidates</strong>
        </p>
        <button className="px-8 py-3 my-4 w-max xl:my-8 bg-black text-white text-2xl  rounded-full border-3 text-yellow-200 font-bold border-green-700 hover:bg-yellow-500 hover:text-black">
          Inquire Now
        </button>
      </div>
      <div className="grid place-items-center">
        <img className="w-1/2 rounded-full" src={suraj} alt="Beautiful Sun" />
      </div>
    </div>
  );
};

export default About;
