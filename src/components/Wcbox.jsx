import React from 'react';

const Wcbox = ({ content, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="card bg-neutral text-neutral-content w-96 bg-white">
        <div className="card-body items-center text-center">
          <h1 className="card-title" id="wcbox">Verification</h1>
          <p id="wcbox" className='verify' >Get verified with worldcoin</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={onClose}>
              LFG🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wcbox;
