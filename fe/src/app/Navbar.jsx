import React from 'react';

const Navbar = () => {
  return (
    <div className="navbar bg-[#f5f589] fixed top-0 left-0 w-full z-10 py-4">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl text-black" id="font">MEMECAST</a>
      </div>
      <div className="navbar-end space-x-4">
        <a className="btn">Connect Wallet</a>
      </div>
    </div>
  );
};

export default Navbar;
