import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import './Result.css'; // CSS import 확인

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedImage } = location.state;

  const handleShare = () => {
    navigate('/share', { state: { selectedImage } });
  };

  const handleSave = () => {
    console.log("저장 버튼 클릭");
  };

  return (
    <div>
      <Header />
      <div className="sparkle-effect" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <img src={selectedImage} alt="Selected" style={{ maxWidth: '450px', height: 'auto', marginTop: '-150px' }} />
      </div>
      <div className="button-container">
        <button className="button" onClick={handleShare}>공유하기</button>
        <button className="button" onClick={handleSave}>저장</button>
      </div>
    </div>
  );
};

export default Result;
