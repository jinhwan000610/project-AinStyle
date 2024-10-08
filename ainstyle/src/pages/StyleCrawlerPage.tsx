import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Crawler from './Crawler';
import './StyleCrawlerPage.css';

const StyleCrawlerPage = () => {
  return (
    <div className="StyleCrawlerPage">
      <Header />
      <Crawler />
      <Footer />
    </div>
  );
}

export default StyleCrawlerPage;