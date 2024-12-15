import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>뉴스 요약 서비스</h1>
      <div>
        <Link to="/topic-search">
          <button style={{ margin: '10px', padding: '10px 20px' }}>주제 검색</button>
        </Link>
        <Link to="/news-map">
          <button style={{ margin: '10px', padding: '10px 20px' }}>뉴스 지도</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
