import React from "react";
import {
  useAuthModal,
  useChain,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";

const Navbar = () => {
  const { openAuthModal } = useAuthModal();
  const user = useUser();
  return (
    <div className="navbar bg-[#f5f589] fixed top-0 left-0 w-full z-10 py-4 flex justify-between items-center">
      {" "}
      {/* Use flexbox and justify-between */}
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl text-black" id="font">
          MEMECAST
        </a>
      </div>
      <div className="navbar-end pr-4">
        {" "}
        {/* Added padding-right to navbar-end */}
        {user != null ? (
          <button className="btn text-black bg-white hover:bg-gray-300 cursor-default">
            {user.address.slice(0, 6)}...{user.address.slice(-4)}
          </button>
        ) : (
          <button
            className="btn text-black bg-white hover:bg-gray-300"
            onClick={openAuthModal}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
