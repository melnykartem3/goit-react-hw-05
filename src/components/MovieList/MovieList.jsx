import { getSource } from "../../movies-api";
import { useState, useEffect } from "react";
import css from "./MovieList.module.css";
import { Link, useLocation } from "react-router-dom";

export default function MovieList({ movies, searchedMovies }) {
  const [source, setSource] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  useEffect(() => {
    async function imageSource() {
      try {
        setLoading(true);
        setError(false);
        const data = await getSource();
        setSource(data);
      } catch {
        setError(true);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    imageSource();
  }, []);

  const baseUrl = source && source.secure_base_url;
  const baseSize = source && source.poster_sizes[6];

  return (
    <div>
      {loading && <p>Is loading, please wait...</p>}
      {error && <p>Oops! There was an error, please reload!</p>}
      {movies && (
        <ul className={css.listMovies}>
          {movies.map((movie) => (
            <li key={movie.id} className={css.listItem}>
              <Link
                className={css.linkSearchMovie}
                to={`/movies/${movie.id}`}
                state={location}
              >
                {movie.title}
              </Link>
              {source && (
                <img
                  className={css.image}
                  src={`${baseUrl}${baseSize}${movie.backdrop_path}`}
                  alt={movie.title}
                />
              )}
            </li>
          ))}
        </ul>
      )}

      {searchedMovies && (
        <>
          <h1 className={css.titleSearch}>Searched movies:</h1>
          <ul className={css.serchMoviesList}>
            {searchedMovies.map((movie) => (
              <li className={css.serchMoviesListItem} key={movie.id}>
                <Link
                  className={css.linkSearchMovie}
                  to={`/movies/${movie.id}`}
                  state={location}
                >
                  {movie.title}
                </Link>
                <img
                  width={150}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
