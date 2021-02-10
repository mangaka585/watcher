import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Movie from './Movie';
import Search from './Search';

const MOVIE_API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=4d1187ff";

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST" :
      return {
        ...state,
        loading : true,
        errorMessage : null
      };
    case "SEARCH_MOVIES_SUCCESS" :
      return {
        ...state,
        loading : false,
        movies : action.payload
      };
    case "SEARCH_MOVIES_FAILURE" :
      return {
        ...state,
        loading : false,
        errorMessage : action.error
      };
    default :
      return state;
  }
};

function App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse.Search
        });
      });
  }, []);

  const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);

    fetch(`https://www.omdbapi.com/?i==${searchValue}&apikey=4d1187ff`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          setMovies(jsonResponse.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
    });
  };

  return(
    <div className="App">
      <Header text="WATCHER" />
      <Search search={search} />
      <p className="App-intro">Некоторые наши избранные фильмы</p>
      <div className="movie">
        {loading && !errorMessage ? (
          <span>загрузка...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => {
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          })
        )}
      </div>
    </div>
  );
};

export default App;
