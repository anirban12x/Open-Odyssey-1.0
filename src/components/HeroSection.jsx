
const HeroSection = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl tracking-wide text-center sm:text-6xl lg:text-7xl">
        
        <span className="text-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text">
          {" "}
          OPEN ODYSSEY
        </span>
      </h1>
      <p className="max-w-4xl mt-10 text-lg text-center text-neutral-100">
        An Official MLH Event. Celebrating Open Source 2024 ( 1st Oct - 31st Oct)
      </p>
      <div className="flex justify-center my-10">
        <a
          href="https://chat.whatsapp.com/E04AothhK6U6Y1xeLatRbP"
          className="px-4 py-3 mx-3 text-center rounded-md bg-gradient-to-r from-purple-500 to-purple-800 transtion-all duration-700 ease-out hover:scale-105 hover:text-slate-200"
        >
          Join our Community
        </a>
        <a href="https://linktr.ee/SamarthXHacktoberfest2024" className="px-4 py-3 mx-3 text-center border rounded-md hover:backdrop-blur-lg transition-all ease-out duration-700 hover:bg-white hover:text-black hover:scale-105">
          Start Contributing
        </a>
      </div>
      {/* <div className="flex justify-center mt-10">
        <video
          autoPlay
          loop
          muted
          className="w-1/2 mx-2 my-4 border border-purple-700 rounded-lg shadow-sm shadow-purple-400"
        >
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video
          autoPlay
          loop
          muted
          className="w-1/2 mx-2 my-4 border border-purple-700 rounded-lg shadow-sm shadow-purple-400"
        >
          <source src={video2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div> */}
    </div>
  );
};

export default HeroSection;
