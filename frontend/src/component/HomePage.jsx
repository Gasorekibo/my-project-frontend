import React from "react";
import poster from "../images/poster.png";

const HomePage = () => {
  return (
    <><hr className="bg-gray-300 mx-10"/>
      <section className="pb-10 bg-gradient-to-b from-gray-800 to-black">
        <div className="relative container px-4 mx-auto">
          <div className="flex flex-wrap items-center -mx-4 mb-10 2xl:mb-14">
          
            <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0 mt-5">
              <span className="text-5xl font-bold text-blue-400">
                Share Your Feeling to Get Health Support
              </span>
              <h2 className="max-w-2xl mt-12 mb-12 text-6xl 2xl:text-8xl text-white font-bold font-heading">
                Pen down your ideas
                <span className="text-blue-400"> By creating a post</span>
              </h2>
              <p className="mb-12 lg:mb-16 2xl:mb-24 text-xl text-gray-100">
              Your post must be free from racism and unhealthy words. We strive to create a supportive 
              community where everyone can freely express themselves while maintaining respect and understanding.
              </p>
            </div>
            <div className="w-full lg:w-1/2 px-4 h-screen flex items-center justify-center">
              <img
                className="w-full h-full object-cover rounded-md "
                src={poster}
                alt={poster}
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
