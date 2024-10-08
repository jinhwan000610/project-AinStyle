import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="Footer">
      <div className="FooterContent">
        <div className="Site">
          <div className="Title">사이트 소개</div>
          <div className="Team">캡스톤 디자인 3팀</div>
          <div className="Links">
            <a href="#">이용약관</a>
            <a href="#">개인정보취급방침</a>
            <a href="#">이용안내</a>
          </div>
        </div>
        <div className="Customer">
          <div className="Title">고객센터</div>
          <div className="Link">
            <a href="#">고객센터 바로가기(클릭)</a>
          </div>
          <div className="Info">
            운영시간 : 오전 10:00 ~ 오후 00:00<br />
            점심시간 : 오후 00:00 ~ 오후 00:00<br />
            휴 무 : 공휴일
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;