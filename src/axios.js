import axios from "axios";

// base url to make requests to the movie database
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

//instance.get('/foo-bar');
//https://api.themoviedb.org/3/foo-bar
//요렇게 나중에 instance.get('주소') 쓰면 baseURL뒤에 알아서 붙는다.

export default instance;
