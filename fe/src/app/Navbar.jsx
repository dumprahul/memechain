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
  const { logOut } = useLogout();
  const user = useUser();
  return (
    <div className="navbar bg-[#f5f589] fixed top-0 left-0 w-full z-10 py-4 flex justify-between items-center">
      <div className="flex space-x-2 my-auto ml-6">
        <Image src="/logo-one.png" alt="logo" width={50} height={50} />{" "}
        <p className="text-xl text-black my-auto" id="font">
          MEMECAST
        </p>
      </div>
      <div className="navbar-end pr-4 my-4">
        {user != null ? (
          <button
            className="btn text-black bg-white hover:bg-gray-300 cursor-default"
            onClick={logOut}
          >
            <Image src="/base.png" alt="logout" width={20} height={20} />
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
