import { useEffect, useState } from "react";
import { getReviews } from "../../movies-api";
import { useParams } from "react-router-dom";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true);
        setError(false);
        const data = await getReviews(movieId);
        setReviews(data);
      } catch {
        setError(true);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [movieId]);

  return (
    <>
      {loading && <p>Is loading, please wait...</p>}
      {error && <p>Oops! There was an error, please reload!</p>}
      {reviews.length === 0 && (
        <p className={css.designReview}>
          We don`t have any reviews for the movie
        </p>
      )}
      {reviews && (
        <>
          <h2 className={css.reviewsTitle}>Reviews</h2>
          <ul className={css.reviewList}>
            {reviews.map((review) => (
              <li key={review.id} className={css.reviewItem}>
                <p>Author: {review.author}</p>
                <p>Content: {review.content}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
