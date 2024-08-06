
import React from 'react';

const Trial = ({ buttonText, onButtonClick }) => {
  return (
    <div className="card bg-base-100 image-full w-80 shadow-xl m-2 mt-9">
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
          <button className="btn btn-primary" onClick={onButtonClick}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Trial;




























// import React from 'react';


// const Trial = ({ buttonText, onButtonClick }) => {
//   return (
//     <div className="card bg-base-100 image-full w-96 shadow-xl m-2">
//       <figure>
//         <img
//           src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
//           alt="Shoes"
//         />
//       </figure>
//       <div className="card-body">
//         <h2 className="card-title"></h2>
//         <p>Deadpool and Wolverine</p>
//         <div className="card-actions justify-end">
//         <button className="btn btn-primary" onClick={onButtonClick}>
//             {buttonText}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Trial;



// import React from 'react';

// const Trial = ({ buttonText, onButtonClick }) => {
//   return (
//     <div className="card bg-neutral text-neutral-content w-96 bg-white">
//       <div className="card-body items-center text-center">
//         <h2 className="card-title">Card Title</h2>
//         <p>Some card content</p>
//         <div className="card-actions justify-end">
//           <button className="btn btn-primary" onClick={onButtonClick}>
//             {buttonText}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Trial;
