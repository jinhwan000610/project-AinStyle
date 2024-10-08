import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  const handleLogoClick = () => {
    window.location.href = '/';
  };
  const handleNoticeClick = () => {
    window.location.href = '/notice';
  };
  const handleAistyleClick = () => {
    window.location.href = '/ai-style';
  };
  const handleBoardClick = () => {
    window.location.href = '/board';
  };
  const handleMypageClick = () => {
    window.location.href = '/mypage';
  };
  const handleLoginClick = () => {
    window.location.href = '/login';
  };

  const handleLogoutClick = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div id="Header">
      <div className="Logo" onClick={handleLogoClick}>Ai In Style</div>
      <div className="Navigation">
        <div className="Menu" onClick={handleNoticeClick}>공지사항</div>
        <div className="Menu" onClick={handleAistyleClick}>AI 코디</div>
        <div className="Menu" onClick={handleBoardClick}>게시판</div>
        <div className="Menu" onClick={handleMypageClick}>마이 페이지</div>
      </div>
      <div id="Login" onClick={isAuthenticated ? handleLogoutClick : handleLoginClick}>
        {isAuthenticated ? 'Logout' : 'Login'}
      </div>
    </div>
  );
};

export default Header;
