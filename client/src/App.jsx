import React from 'react'
import MovieList from './components/movieList';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "@fontsource/dm-sans";
import "@fontsource/inter";

function App() {
  
  return(
    <div className='movie-app'>
      <div className='Grid'>
        <MovieList/>
      </div>
    </div>
  );
};

export default App;