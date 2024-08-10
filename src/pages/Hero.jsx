import React from 'react';

const Hero = () => {
  return (
    <div className="hero bg-hero-bg bg-base-200 min-h-screen  flex justify-end items-center font-library" id="fontf">
      <div className="text-right mr- flex flex-col items-center"> {/* Added flex and items-center */}
        <h1 className="text-7xl font-library">MEMECHAIN!</h1>
        <p className="py-2 text-3xl">GET YOUR MEMES ATTESTED ON-CHAIN ASAP</p> {/* Removed justify-center from p */}
        <div>
        <button className="btn btn-secondary" id="fontf">LFG FRENDS</button> 
        </div>
      </div>
    </div>
  );
}

export default Hero;
