import React from 'react';

const Navbar = () => {
  return (
    <div className="navbar bg-[#f5f589] fixed top-0 left-0 w-full z-10 py-4 flex justify-between items-center"> {/* Use flexbox and justify-between */}
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl text-black" id="font">MEMECAST</a>
      </div>
      <div className="navbar-end pr-4"> {/* Added padding-right to navbar-end */}
        <a className="btn text-black bg-white hover:bg-gray-300">Connect Wallet</a>
      </div>
    </div>
  );
};

export default Navbar;
