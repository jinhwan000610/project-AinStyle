import React from 'react';
import './StylingLink.css';
import aistyling1Img from '../assets/img/AiStyling.png'; // 이미지 파일 import

const StylingLink = () => {
  const handleAistyleClick = () => {
    window.location.href = '/ai-style';
  };

  return (
    <div className="StylingButton" onClick={handleAistyleClick}>
      <div className="Background" />
      <img className="Aistyling1" src={aistyling1Img} alt="Aistyling1" />
      <div className="AiStyling">Ai Styling</div>
    </div>
  );
};

export default StylingLink;