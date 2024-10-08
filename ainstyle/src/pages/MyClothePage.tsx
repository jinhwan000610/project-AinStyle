import React, { useState } from 'react';
import './MyClothePage.css';
import SelectButton from "./SelectButton";

const MyClothePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 20; // 한 페이지에 표시될 이미지 수
  // 임의의 이미지 데이터 생성
  const images = [
   { id: 1, src: 'img/styleimg1.jpg', alt: 'heartFashion' },
   { id: 2, src: 'img/styleimg2.jpg', alt: 'heartFashion' },
   { id: 3, src: 'img/styleimg3.jpg', alt: 'heartFashion' },
   { id: 4, src: 'img/styleimg4.jpg', alt: 'heartFashion' },
   { id: 5, src: 'img/styleimg1.jpg', alt: 'heartFashion' },
   { id: 6, src: 'img/styleimg2.jpg', alt: 'heartFashion' },
   { id: 7, src: 'img/styleimg3.jpg', alt: 'heartFashion' },
   { id: 8, src: 'img/styleimg4.jpg', alt: 'heartFashion' },
   { id: 9, src: 'img/styleimg1.jpg', alt: 'heartFashion' },
   { id: 10, src: 'img/styleimg2.jpg', alt: 'heartFashion' },
   { id: 11, src: 'img/styleimg3.jpg', alt: 'heartFashion' },
   { id: 12, src: 'img/styleimg4.jpg', alt: 'heartFashion' },
   { id: 13, src: 'img/styleimg1.jpg', alt: 'heartFashion' },
   { id: 14, src: 'img/styleimg2.jpg', alt: 'heartFashion' },
   { id: 15, src: 'img/styleimg3.jpg', alt: 'heartFashion' },
   { id: 16, src: 'img/styleimg4.jpg', alt: 'heartFashion' },
   { id: 17, src: 'img/styleimg1.jpg', alt: 'heartFashion' },
   { id: 18, src: 'img/styleimg2.jpg', alt: 'heartFashion' },
   { id: 19, src: 'img/styleimg3.jpg', alt: 'heartFashion' },
   { id: 20, src: 'img/styleimg4.jpg', alt: 'heartFashion' },
   { id: 21, src: 'img/styleimg1.jpg', alt: 'heartFashion' },
   { id: 22, src: 'img/styleimg2.jpg', alt: 'heartFashion' },
   { id: 23, src: 'img/styleimg3.jpg', alt: 'heartFashion' },
   { id: 24, src: 'img/styleimg4.jpg', alt: 'heartFashion' },
   { id: 24, src: 'img/styleimg4.jpg', alt: 'heartFashion' },
   
   // 추가 이미지 데이터를 필요한 만큼 이어서 추가할 수 있습니다
 ];

  // 현재 페이지의 이미지 목록을 계산하는 함수
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  // 페이지 네비게이션을 만드는 함수
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(images.length / imagesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setCurrentPage(Number(event.currentTarget.id));
  };

  return (
    <div className="myPage">
      <div className="Head">나의 옷장</div>
      <SelectButton />
      <div className="clothe">
        <div className="subTitle">나의 옷장</div>
        <input className="search" type="text" placeholder="제목을 입력하세요" />
      </div>
      <div className="imageLine">
        {currentImages.map((image, index) => (
          <img className="img_Box" src={image.src} alt={image.alt} key={index} />
        ))}
      </div>
      {/* 페이지 네비게이션 */}
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number}>
            <a href="#" id={number.toString()} onClick={handleClick}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyClothePage;

