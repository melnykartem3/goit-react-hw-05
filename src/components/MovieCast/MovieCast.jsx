import { useEffect, useState } from "react";
import { getCast } from "../../movies-api";
import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [cast, setCast] = useState(null);
  useEffect(() => {
    async function fetchCast() {
      try {
        setLoading(true);
        const data = await getCast(movieId);
        setCast(data);
        setError(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchCast();
  }, [movieId]);

  return (
    <>
      {loading && <p>Is loading, please wait...</p>}
      {error && <p>Oops! There was an error, please reload!</p>}
      {cast && cast.length > 0 && (
        <>
          <h2 className={css.castTitle}>Cast</h2>
          <ul className={css.castList}>
            {cast.slice(0, 9).map((actor) => (
              <li key={actor.id} className={css.actorItem}>
                <img
                  width={150}
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.name}
                />
                <p className={css.actorNameDesc}>{actor.name}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
