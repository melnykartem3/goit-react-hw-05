import { useEffect, useState, useRef } from "react";
import {
  useParams,
  NavLink,
  Outlet,
  Link,
  useLocation,
} from "react-router-dom";
import { getDetails } from "../../movies-api";
import css from "./MovieDetailsPage.module.css";
import clsx from "clsx";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function MovieDetailsPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();

  const location = useLocation();
  const backLinkURLRef = useRef(location.state) ?? "/movies";

  useEffect(() => {
    async function fetchDetails() {
      try {
        setLoading(true);
        const data = await getDetails(movieId);
        setMovie(data);
        setError(false);
      } catch {
        setLoading(false);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [movieId]);

  return (
    <>
      {loading && <p>Is loading, please wait...</p>}
      {error && <p>Oops! There was an error, please reload!</p>}
      {movie && (
        <>
          <div className={css.backWrapper}>
            <Link className={css.backLink} to={backLinkURLRef.current}>
              Go back
            </Link>
          </div>
          <div className={css.movieWrapper}>
            <img
              className={css.movieImage}
              height="700"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className={css.partMovieWrapper}>
              <h1>{movie.title}</h1>
              <p className={css.movieDesc}>Overview</p>
              <p className={css.movieDesc}>{movie.overview} </p>
              <p className={css.movieDesc}>Genres</p>
              <p className={css.movieDesc}>
                {movie.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p className={css.movieDesc}>Views</p>
              <p className={css.movieDesc}>{movie.popularity}</p>
            </div>
          </div>
          <p className={css.addDesc}>Additional information</p>
          <ul className={css.additionalList}>
            <li className={css.listItem}>
              <NavLink className={buildLinkClass} to="cast">
                Cast
              </NavLink>
            </li>
            <li className={css.listItem}>
              <NavLink className={buildLinkClass} to="reviews">
                Reviews
              </NavLink>
            </li>
          </ul>
          <Outlet />
        </>
      )}
    </>
  );
}
