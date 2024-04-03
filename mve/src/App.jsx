import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import MovieCard from './components/MovieCard';
import SearchBar from './components/SearchBar';

function App() {
  const [allMovieData, setAllMovieData] = useState([]);
  const [searchMovie, setSearchMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMovieData = async () => {
    try {
      setLoading(true);
      console.log(searchMovie,"this is search movie")
      const res = await fetch(`http://www.omdbapi.com/?s=${searchMovie}&apikey=45774a9c`);
      const data = await res.json();
      setAllMovieData(data.Search);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // if (searchMovie) {
      fetchMovieData();
    // }
  }, [searchMovie]);

  return (
    <div>
      <Navbar />
      <div className="bg">
        <SearchBar searchMovie={searchMovie} setSearchMovie={setSearchMovie} fetchMovieData={fetchMovieData} />
        <MovieCard allMovieData={allMovieData} loading={loading} />
      </div>
    </div>
  )
}

export default App