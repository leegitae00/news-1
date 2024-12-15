import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function TopicSearchPage() {
  const [topic, setTopic] = useState(''); // 검색 주제 저장
  const [results, setResults] = useState([]); // 검색 결과 저장
  const [sentimentCounts, setSentimentCounts] = useState({ 긍정: 0, 부정: 0, 중립: 0 }); // 감정 결과 카운트
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  const handleSearch = async () => {
    if (!topic.trim()) {
      alert('검색하고 싶은 키워드를 입력하세요(예:탄핵) ');
      return;
    }

    // 기존 결과 초기화
    setResults([]);
    setSentimentCounts({ 긍정: 0, 부정: 0, 중립: 0 });
    setError(null);
    setLoading(true);

    try {
      // 백엔드 API 호출
      const response = await fetch('http://127.0.0.1:5000/topic-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        throw new Error('데이터를 불러오는 중 오류가 발생했습니다.');
      }

      const data = await response.json();

      // 감정 분석 결과 카운트 계산
      const counts = data.news.reduce((acc, item) => {
        acc[item.sentiment] = (acc[item.sentiment] || 0) + 1;
        return acc;
      }, {});

      // 상태 업데이트
      setResults(data.news);
      setSentimentCounts({
        긍정: counts['긍정'] || 0,
        부정: counts['부정'] || 0,
        중립: counts['중립'] || 0,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setTopic(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const chartData = { // 긍정, 부정, 중립 데이터 정의
    labels: ['긍정', '부정', '중립'],
    datasets: [{
      data: [sentimentCounts.긍정, sentimentCounts.부정, sentimentCounts.중립],
      backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      hoverOffset: 30,
    }],
  };

  const positiveNews = results.filter(news => news.sentiment === '긍정').slice(0, 3);
  const neutralNews = results.filter(news => news.sentiment === '중립').slice(0, 3);
  const negativeNews = results.filter(news => news.sentiment === '부정').slice(0, 3);

  return (
    <div style={{ padding: '20px' }}>
      <h1>주제 검색</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="검색 주제 입력"
          value={topic}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          style={{ padding: '10px', width: '80%' }}
        />
        <button
          onClick={handleSearch}
          style={{ padding: '10px 20px', marginLeft: '10px' }}
        >
          검색
        </button>
      </div>

      {loading && <p>로딩 중...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && results.length > 0 && (
        <>
          <div style={{
            maxWidth: '350px',
            margin: '20px auto',
          }}>
            <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>감정 분석 결과</h3>
            <Pie data={chartData} />
          </div>

          {/* 라벨과 뉴스 섹션 */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: '20px',
          }}>
            {/* 긍정 섹션 */}
            <div style={{
              flex: 1,
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              backgroundColor: '#36A2EB22', // 배경색
              margin: '0 10px',
            }}>
              <h3 style={{ color: '#36A2EB', textAlign: 'center' }}>긍정</h3>
              {positiveNews.map((news, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                  <h4>
                    <a href={news.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#36A2EB' }}>
                      {news.title}
                    </a>
                  </h4>
                  <p>{news.content_summarized}</p>
                </div>
              ))}
            </div>

            {/* 중립 섹션 */}
            <div style={{
              flex: 1,
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              backgroundColor: '#FFCE5622',
              margin: '0 10px',
            }}>
              <h3 style={{ color: '#FFCE56', textAlign: 'center' }}>중립</h3>
              {neutralNews.map((news, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                  <h4>
                    <a href={news.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#FFCE56' }}>
                      {news.title}
                    </a>
                  </h4>
                  <p>{news.content_summarized}</p>
                </div>
              ))}
            </div>

            {/* 부정 섹션 */}
            <div style={{
              flex: 1,
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              backgroundColor: '#FF638422',
              margin: '0 10px',
            }}>
              <h3 style={{ color: '#FF6384', textAlign: 'center' }}>부정</h3>
              {negativeNews.map((news, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                  <h4>
                    <a href={news.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#FF6384' }}>
                      {news.title}
                    </a>
                  </h4>
                  <p>{news.content_summarized}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TopicSearchPage;
