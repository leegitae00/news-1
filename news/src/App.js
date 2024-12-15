import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TopicSearchPage from './pages/TopicSearchPage';
import NewsMapPage from './pages/NewsMapPage';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/topic-search" element={<TopicSearchPage />} />
        <Route path="/news-map" element={<NewsMapPage />} />
      </Routes>
    </Router>
  );
}

export default App;
