import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  // A snippet of code which runs based on a specific condition/varaible
  useEffect(() => {
    // if [], run once when the row loads, and dont run again

    async function fetchData() {
      const request = await axios.get(fetchUrl);
      //App.js의 fetchUrl
      // ex) https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213

      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  // [fetchUrl]은 useEffect에게 block 밖에 있는 variable를 쓰고있다고 알려주는것
  // 여기서 Url은 계속 바뀌니까 바뀔 때 마다 알려주는건가?

  console.table(movies);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          // https://www.youtube.com/watch?v=XtMThy8QKqU
          // ?뒤에 부분 pass해서 어떻게 한다는 듯. XtMThy8QKqU 이 부분은 video ID
          // https://www.youtube.com/watch?v=XtMThy8QKqU&banana=5
          // urlParams.get('banana'); 하면 5라는 value를 줌. 고로 'v' 하면 video ID 부분 반환
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error)); //맞는 영상 없으면 error 송출
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
