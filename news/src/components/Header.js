import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={{ backgroundColor: '#333', color: '#fff', padding: '10px 0', textAlign: 'center' }}>
      <nav>
        <Link to="/" style={{ color: '#fff', margin: '0 15px' }}>홈</Link>
        <Link to="/topic-search" style={{ color: '#fff', margin: '0 15px' }}>이슈 검색</Link>
        <Link to="/news-map" style={{ color: '#fff', margin: '0 15px' }}>지역 뉴스 검색</Link>
      </nav>
    </header>
  );
}

export default Header;
