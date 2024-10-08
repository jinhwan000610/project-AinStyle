import React from 'react';
import './SelectButton.css'

const SelectButton = () => {
  const handlemyHeartBtnClick = () => {
    window.location.href = '/MyHeartPage';
  };
  const handlemyClothesBtnClick = () => {
    window.location.href = '/MyClothePage';
  };
  const handlemyInfoBtnClick = () => {
    window.location.href = '/MyInfo';
  };

  return(
    <div className="selectButton">
      <button className="myHeartBtn" onClick={handlemyHeartBtnClick}> 나의 하트</button> 
      <button className="myInfoBtn" onClick={handlemyInfoBtnClick}>나의 정보</button>
    </div> 
  )
}

export default SelectButton;