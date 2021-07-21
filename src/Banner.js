import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";

import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Banner({ fetchUrl }) {
  const [movie, setMovie] = useState([]); //새로고침 할때마다 NetflixOriginals 랜덤 콘텐츠 추천
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );

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
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      //console.log("%cNAME: " + movieName, "color: green; font-size: 16px;");
      const movieName = movie?.name || movie?.title;
      movieTrailer(movieName)
        .then((url) => {
          // https://www.youtube.com/watch?v=XtMThy8QKqU
          // ?뒤에 부분 pass해서 어떻게 한다는 듯. XtMThy8QKqU 이 부분은 video ID
          // https://www.youtube.com/watch?v=XtMThy8QKqU&banana=5
          // urlParams.get('banana'); 하면 5라는 value를 줌. 고로 'v' 하면 video ID 부분 반환
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
          console.log("===", url);
        })
        .catch((error) => console.log(error)); //맞는 영상 없으면 error 송출
    }
  };
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
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
          <button className="banner__button" onClick={() => handleClick(movie)}>
            Play
          </button>
          <button className="banner__button">My List</button>
        </div>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
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
