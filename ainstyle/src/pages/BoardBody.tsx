import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './BoardBody.css';

interface Post {
  id: number;
  title: string;
  content: string;
  image: string;
}

const BoardBody = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/posts');
        const allPosts = response.data;
        setPosts(allPosts);

        // 배열을 랜덤하게 섞기
        const shuffledPosts = [...allPosts].sort(() => 0.5 - Math.random());
        // 랜덤으로 섞은 배열에서 상위 3개의 게시물 추출
        const randomThreePosts = shuffledPosts.slice(0, 3);
        setRecentPosts(randomThreePosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="Boardbody">
      <div className="best-div">
        <div className="best-title-wrap">
          <h1>TODAY BEST</h1>
        </div>
        <div className="best-style-card-container">
          {recentPosts.map(post => (
            <div key={post.id} className="best-style-card-wrap">
              <Link to={`/post/${post.id}`}>
                <img src={post.image} alt={post.title} />
                <h3>{post.title}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="filter-div">
        <div className="top-line"></div>
        <div className="filter-button-container">
          
        </div>
        <div className="best-title-wrap">
          <h1>POSTING</h1>
        </div>
        <div className="filter-button-container">
          
        </div>
      </div>
      <div className="post-list">
        {posts.map(post => (
          <div key={post.id} className="post-item">
            <Link to={`/post/${post.id}`}>
              <img src={post.image} alt={post.title} />
              <h3>{post.title}</h3>
            </Link>
          </div>
        ))}
      </div>
      <div className="pagination">
        <div>
          <div>prev</div>
        </div>
        <div>|</div>
        <div className="pagination-number-container">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
        </div>
        <div>|</div>
        <div>
          <div>next</div>
        </div>
      </div>
    </div>
  );
};

export default BoardBody;
