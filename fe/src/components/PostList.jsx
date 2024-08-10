// PostList.js
import React from 'react';
import PostCard from './PostCard';

const PostList = () => {
  const posts = [
    { id: 1, title: 'Post 1', content: 'Content for post 1.' },
    { id: 2, title: 'Post 2', content: 'Content for post 2.' },
    { id: 3, title: 'Post 3', content: 'Content for post 3.' },
    { id: 4, title: 'Post 4', content: 'Content for post 4.' },
  ];

  return (
    <div className="flex justify-center space-x-10 p-4">
      {posts.map(post => (
        <PostCard key={post.id} title={post.title} content={post.content} />
      ))}
    </div>
  );
};

export default PostList;
