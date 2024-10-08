import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BodyBest.css';

interface Post {
  id: number;
  title: string;
  content: string;
  image: string;
}

const BodyBest = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [randomPosts, setRandomPosts] = useState<Post[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/posts');
        const allPosts = response.data;
        setPosts(allPosts);

        // 최근 5개의 게시물 추출
        const shuffledPosts = allPosts.sort(() => 0.5 - Math.random());
        const recentFivePosts = shuffledPosts.slice(0, 5);
        setRandomPosts(recentFivePosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (randomPosts.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % randomPosts.length);
      }, 3000); // 3초마다 이미지 변경

      return () => clearInterval(interval);
    }
  }, [randomPosts]);

  const displayedImages = randomPosts.length > 0 ? [
    randomPosts[(currentIndex) % randomPosts.length],
    randomPosts[(currentIndex + 1) % randomPosts.length],
    randomPosts[(currentIndex + 2) % randomPosts.length],
    randomPosts[(currentIndex + 3) % randomPosts.length],
  ] : [];

  return (
    <div className="BodyBest">
      <div className="BestText">베스트 코디</div>
      <div className="BestStyle">
        {displayedImages.map((post, index) => (
          post && ( // post가 undefined가 아닌지 확인
            <div key={index} className="Best">
              <img className="BestImage" src={post.image} alt={`Best ${index + 1}`} />
              <div className="Hashtag">#{post.title}</div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

export default BodyBest;
