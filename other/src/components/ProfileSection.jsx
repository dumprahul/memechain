import React from 'react';

function PostCard({ title, description }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-4 flex-1">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}

function PostsSection() {
  const posts = [
    { title: 'Post 1', description: 'This is the description for post 1.' },
    { title: 'Post 2', description: 'This is the description for post 2.' },
    { title: 'Post 3', description: 'This is the description for post 3.' },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <div className="flex flex-wrap -m-4">
        {posts.map((post, index) => (
          <PostCard key={index} title={post.title} description={post.description} />
        ))}
      </div>
    </div>
  );
}

export default PostsSection;
