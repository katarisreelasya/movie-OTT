import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import MovieCard from './components/MovieCard';
import SearchBar from './components/SearchBar';
import Title from './components/Title';

function App() {
  const [allMovieData, setAllMovieData] = useState([]);  //[] represents list of movies in the form of array
  const [searchMovie, setSearchMovie] = useState(null); //initial value null means no search is performed and show all movie cards. If we have a string.
  const [loading, setLoading] = useState(false);

  const fetchMovieData = async () => {
    try {
      setLoading(true);
      console.log(searchMovie,"this is search movie")  
      const res = await fetch(`http://www.omdbapi.com/?s=${searchMovie}&apikey=45774a9c`);
      const data = await res.json(); //https://api.themoviedb.org/3/search/movie?s=${searchMovie}&api_key=f986c1c8a34198d32dc5cbd003cc1aab
      setAllMovieData(data.Search);   //https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=f986c1c8a34198d32dc5cbd003cc1aabb
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieData();
  }, [searchMovie]);

  return (
    <div>
      <Navbar />
      <div className="bg">
        <SearchBar searchMovie={searchMovie} setSearchMovie={setSearchMovie} fetchMovieData={fetchMovieData} />
        <Title/>
        <MovieCard allMovieData={allMovieData} loading={loading} />
      </div>
    </div>
  )
}

export default App