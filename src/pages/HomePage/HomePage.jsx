import { getMovies } from "../../movies-api";
import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const data = await getMovies();
        setMovies(data);
        setError(false);
      } catch {
        setLoading(false);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  return (
    <div>
      {loading && <p>Is loading, please wait...</p>}
      {error && <p>Oops! There was an error, please reload!</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
