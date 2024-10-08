import React from 'react';
import Header from './Header';
import Footer from './Footer';
import LoginBody from './LoginBody';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className="LoginPage"> {/* CSS 클래스를 적용합니다. */}
      <Header />
      <LoginBody />
      <Footer />
    </div>
  );
}

export default LoginPage;