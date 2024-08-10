// PostCard.js
import React from 'react';

const PostCard = ({ title, content }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-64">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-700">{content}</p>
    </div>
  );
};

export default PostCard;
