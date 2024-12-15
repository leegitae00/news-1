import React, { useEffect, useState } from "react";

function NewsMapPage() {
  const [clickedLocation, setClickedLocation] = useState(null); //클릭한 위치 저장
  const [address, setAddress] = useState(""); // 주소 저장 상태

  useEffect(() => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(37.4488, 127.1267), //초키 위치 가천대로
      zoom: 15, //가까이 보이게
    };
    const map = new window.naver.maps.Map("map", mapOptions);

    //사용자가 클릭한 위치 저장
    window.naver.maps.Event.addListener(map, "click", function(e) {
      const latlng = e.coord;
      setClickedLocation({ lat: latlng.lat(), lng: latlng.lng() }); //위도.경도 좌표 저장
      searchCoordinateToAddress(latlng, map);
    });

    // reverse geocoding 활용해서 좌표를 주소명으로 변환하기
    function searchCoordinateToAddress(latlng, map) {
      window.naver.maps.Service.reverseGeocode({
        coords: latlng,
        orders: [
          window.naver.maps.Service.OrderType.ADDR,
          window.naver.maps.Service.OrderType.ROAD_ADDR
        ].join(',')
      }, function(status, response) {
        if (status !== window.naver.maps.Service.Status.OK) {
          setAddress("주소를 찾을 수 없습니다."); //주소 없는 경우
          return;
        }
        const result = response.v2.address;
        setAddress(result.jibunAddress);
      });
    }
  }, []);

  //지도 표시
  return (
    <div style={{ padding: "20px" }}>
      <h1>뉴스 지도</h1>
      <div
        id="map"
        style={{
          width: "100%",
          height: "400px",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      ></div>

      {clickedLocation && (
        <div style={{ marginTop: "20px" }}>
          <h3>검색할 위치 주소</h3>
          <p>{address}</p>
        </div>
      )}
    </div>
  );
}

export default NewsMapPage;