import React from 'react';

const Card = ({ title, onClick }) => {
  return (
    <div 
      className="card bg-base-100 image-full w-64 shadow-xl border border-black cursor-pointer"
      onClick={onClick}
    >
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt={title}
        />
      </figure>
      <div className="card-body flex flex-col justify-center items-center">
        <h2 className="card-title mb-4">{title}</h2>
      </div>
    </div>
  );
}

export default Card;
