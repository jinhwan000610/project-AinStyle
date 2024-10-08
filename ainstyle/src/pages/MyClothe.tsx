import { useNavigate } from 'react-router-dom';
import React from 'react';
import './MyHeart.css';

const MyClothe = () => {
  const navigate = useNavigate();
   
  const navigateTo = (path : string) =>{
   console.log('Navigating to : ${path}');
    navigate(path);
  }
  return (
    
    <div className="heartStyle">
      <div className='heartWrapper'>
        
        <div className="heartHeader"> 나의 옷장 </div>
        
        <div className="more" onClick={() => navigateTo('./MyClothePage')}>+ More </div>
      </div>

      <div className="imageLine">
        <img className="img_Box" src="img/styleimg1.jpg" alt="heartFashion" />
        <img className="img_Box" src="img/styleimg2.jpg" alt="heartFashion" />
        <img className="img_Box" src="img/styleimg3.jpg" alt="heartFashion" />
        <img className="img_Box" src="img/styleimg4.jpg" alt="heartFashion" />
      </div>
    </div>
  )
}

export default MyClothe;
