import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MyHeart.css';
const MyHeart = () =>{
  const navigate = useNavigate();
   
  const navigateTo = (path : string) =>{
  
    navigate(path);
  }
 return(
  <div className = "heartStyle">
    <div className='heartWrapper'>
    <div className = "heartHeader"> 나의 하트 스타일 </div>
    <div className="more"  onClick={() => navigateTo('./MyheartPage')}>+ More </div>
    </div>
    
    <div className="imageLine">
        <img className = "img_Box" src = "https://image.musinsa.com/images/style/list/2024061717121800000079939.jpg" alt ="heartFashion"/>
        <img className = "img_Box" src = "https://image.musinsa.com/images/style/list/2024061717270300000062922.jpg" alt ="heartFashion"/>
        <img className = "img_Box" src = "https://image.musinsa.com/images/style/list/2024061214372700000043872.jpg" alt ="heartFashion"/>
        <img className = "img_Box" src = "https://image.musinsa.com/images/style/list/2024061716362600000038779.jpg" alt ="heartFashion"/>
    </div>
 
  </div>
)
}  

export default MyHeart;