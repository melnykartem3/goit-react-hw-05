import { useEffect, useState, lazy, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import css from "./MoviesPage.module.css";
import { getSearch } from "../../movies-api";
const MovieList = lazy(() => import("../../components/MovieList/MovieList"));

export default function MoviesPage() {
  const [searched, setSearched] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    async function fetchSearch() {
      try {
        setLoading(true);
        const queryParams = searchParams.get("query");
        if (queryParams !== null) {
          setQuery(queryParams);
          const data = await getSearch(queryParams);
          setSearched(data);
          setError(false);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchSearch();
  }, [searchParams]);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target.elements;
    const inputValue = form.searchInput.value.trim();
    if (inputValue !== "") {
      setQuery(inputValue);
      setSearchParams({ query: inputValue });
    }
  }

  function handleChange(event) {
    setQuery(event.target.value);
    setSearchParams({ query: event.target.value });
  }

  return (
    <>
      {error && <p>Oops! There was an error, please reload!</p>}
      {loading && <p>Loading, please wait...</p>}
      {searched && (
        <>
          <form className={css.formSearch} onSubmit={handleSubmit}>
            <input
              className={css.inputSearch}
              type="text"
              name="searchInput"
              value={query}
              onChange={handleChange}
            />
            <button className={css.searchBtn} type="submit">
              Search
            </button>
          </form>
        </>
      )}
      <Suspense fallback={<div>Please wait, loading page...</div>}>
        {searched.length > 0 && (
          <MovieList searchedMovies={searched}></MovieList>
        )}
      </Suspense>
    </>
  );
}
