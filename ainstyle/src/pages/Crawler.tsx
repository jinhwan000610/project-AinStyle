import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Crawler.css';
import Header from './Header';

const Crawler: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [displayImages, setDisplayImages] = useState<string[]>([]);
  interface LocationState {
    images: string[];
    formattedResponse: string;
  }
  
  useEffect(() => {
    if (state.images) {
      const shuffleArray = (array: string[]) => {
        const arr = array.slice();
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
      };
      setDisplayImages(shuffleArray(state.images).slice(0, 5));
    }
  }, [state.images]);

  if (!state) {
    return <div>데이터를 불러오지 못했습니다.</div>;
  }

  // 올바르게 formattedResponse를 추출합니다.
  const { formattedResponse } = state;

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
  };

  const handleConfirm = () => {
    if (selectedImage) {
      navigate('/result', { state: { selectedImage } });
    } else {
      alert('Please select an image.');
    }
  };

  return (
    <div>
      <Header />
      <div className="CrawlerBody">
        <div className="CrawlerTitle">추천결과</div>
        <div dangerouslySetInnerHTML={{ __html: formattedResponse }}></div>
        <h2>Images</h2>
        <div className="CrawlerFrame">
          {displayImages.map((src, index) => (
            <div key={index} className={`ImageContainer ${src === selectedImage ? 'selected' : ''}`} onClick={() => handleImageClick(src)}>
              <img src={src} alt={`Image ${index}`} style={{ width: '100%', height: 'auto' }} />
            </div>
          ))}
        </div>
        <div className="CrawlerControls">
          <button className="SelectButton" onClick={handleConfirm}>Select</button>
          <button className="RefreshButton" onClick={() => window.location.reload()}>Refresh</button>
        </div>
      </div>
    </div>
  );
};

export default Crawler;
