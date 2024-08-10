import React from "react";
import {
  useAuthModal,
  useChain,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";
import Image from "next/image";

const Navbar = () => {
  const { openAuthModal } = useAuthModal();
  const user = useUser();
  return (
    <div className="navbar bg-[#f5f589] fixed top-0 left-0 w-full z-10 py-4 flex justify-between items-center">
      {" "}
      {/* Use flexbox and justify-between */}
      <div className="flex space-x-2 my-auto ml-6">
        <Image src="/logo-one.png" alt="logo" width={50} height={50} />{" "}
        {/* Added logo */}
        <p className="text-xl text-black my-auto" id="font">
          MEMECAST
        </p>
      </div>
      <div className="navbar-end pr-4">
        {" "}
        {/* Added padding-right to navbar-end */}
        <button
          className="btn text-black bg-white hover:bg-gray-300"
          onClick={openAuthModal}
        >
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default Navbar;
