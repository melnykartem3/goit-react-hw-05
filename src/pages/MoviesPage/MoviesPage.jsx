import { useEffect, useState, lazy, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import css from "./MoviesPage.module.css";
import { getSearch } from "../../movies-api";
const MovieList = lazy(() => import("../../components/MovieList/MovieList"));

export default function MoviesPage() {
  const [searched, setSearched] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function fetchSearch() {
      try {
        if (!isSearch && searchParams.has("query")) {
          setLoading(true);
          setQuery(searchParams.get("query"));
          setIsSearch(true);
        } else if (isSearch && query.trim() !== "") {
          setLoading(true);
          const data = await getSearch(query);
          setSearched(data);
          setError(false);
        }
      } catch {
        setLoading(false);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchSearch();
  }, [query, isSearch, searchParams]);

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target.elements;
    const inputValue = form.searchInput.value.trim();
    if (inputValue !== "") {
      setQuery(inputValue);
      setIsSearch(true);
      searchParams.set("query", inputValue);
    }
  }

  function handleChange(event) {
    setQuery(event.target.value);
    setIsSearch(false);
    searchParams.delete("query");
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
