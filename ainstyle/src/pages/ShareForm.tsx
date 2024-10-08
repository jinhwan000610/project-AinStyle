import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import './ShareForm.css';

const ShareForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedImage } = location.state;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 게시판에 글 올리기 API 호출
      await axios.post('http://localhost:8080/api/posts', {
        title,
        content,
        image: selectedImage,
      });
      // 게시 완료 후 게시판 페이지로 이동
      navigate('/board');
    } catch (error) {
      console.error('Error posting to the board:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="share-form-container">
        <h2>글 작성</h2>
        <form onSubmit={handleSubmit}>
          <div className="image-container">
            <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
          <div>
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="content">내용</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit">게시하기</button>
        </form>
      </div>
    </div>
  );
};

export default ShareForm;
