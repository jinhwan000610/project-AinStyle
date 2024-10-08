import React from 'react';
import Header from './Header';
import Footer from './Footer';
import NoticeBody from './NoticeBody';
import './NoticePage.css';

const NoticePage = () => {
  return (
    <div className="NoticePage"> {/* CSS 클래스를 적용합니다. */}
      <Header />
      <NoticeBody />
      <Footer />
    </div>
  );
}

export default NoticePage;