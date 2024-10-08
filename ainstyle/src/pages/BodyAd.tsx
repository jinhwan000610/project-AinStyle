import React from 'react';
import './BodyAd.css';
import AdImage from '../assets/img/Ad.png';

const AdImageUrl = 'https://www.musinsa.com/cms/news/view/7694';

const BodyAd = () => {
  return (
    <div className="Bodyad">
      <div className="Youtube">
        <iframe 
          width="1000" 
          height="555" 
          src="https://www.youtube.com/embed/-IeWgAKBPW0?si=Edbv18Sbkl5uOti1" 
          title="YouTube video player" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>
      <div className="Webad">
        <div className="Adimage">
          <a href={AdImageUrl} target="_blank" rel="noopener noreferrer">
            <img className="Ad" src={AdImage} alt="Advertisement" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default BodyAd;