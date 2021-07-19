import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]); //새로고침 할때마다 NetflixOriginals 랜덤 콘텐츠 추천

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      //[movie 1, movie2 ,movie3 ,,,] 중에 random으로 하나 뽑기
      // -1 은 아마 array개수 안 넘어가게 하려고?

      return request;
    }
    fetchData();
  }, []);

  console.log(movie);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  //description이 길어졌을 때 말줄임표(...) 생성

  /*
    header를 따로 banner로 설정한 이유는 banner의 이미지와 banner의 콘텐츠(내용)에 
    다른 효과를 주기 위함. (서로 영향을 끼치지 않게 하기 위해) 
    */
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
                "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>

        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
          {/* 위에서 설정한 truncate 함수 사용 */}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
