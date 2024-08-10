import React from 'react';
import logo from '../assets/rahul.jpg'

function ProfileCard() {
  return (

    <>
    <div className='flex justify-center' id="profile"><h1>Your Profile.</h1></div>
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6 mt-16">
      <div className="sm:flex sm:items-center">
        <img className="block mx-auto sm:mx-0 sm:flex-shrink-0 h-24 rounded-lg sm:mr-4" src={logo} alt="Profile" />
        <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
          <p className="text-2xl leading-tight font-bold">Rahul Shanmugam S</p>
          <p className="text-sm leading-tight text-gray-600 mb-4">@farcaster account ID</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-9">
            <div>
              <p className="text-lg font-semibold">1.2K</p>
              <p className="text-sm text-gray-600">Likes</p>
            </div>
            <div>
              <p className="text-lg font-semibold">800</p>
              <p className="text-sm text-gray-600">Aura</p>
            </div>
            <div>
              <p className="text-lg font-semibold">50</p>
              <p className="text-sm text-gray-600">Total Posts</p>
            </div>
            <div>
              <p className="text-lg font-semibold">3</p>
              <p className="text-sm text-gray-600">Tokens Owned</p>
            </div>
            <div>
              <p className="text-lg font-semibold">63</p>
              <p className="text-sm text-gray-600">Memes Shared</p>
            </div>
          </div>
          <div className="mt-4">
            <button className="text-indigo-500 hover:text-white hover:bg-indigo-500 border border-indigo-500 font-semibold py-2 px-4 rounded-full">
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default ProfileCard;
