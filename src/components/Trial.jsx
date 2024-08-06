import React from 'react';


const Trial = ({ buttonText }) => {
  return (
    <div className="card bg-base-100 image-full w-96 shadow-xl m-2">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title"></h2>
        <p>Deadpool and Wolverine</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">{buttonText}</button>
        </div>
      </div>
    </div>
  );
};

export default Trial;
