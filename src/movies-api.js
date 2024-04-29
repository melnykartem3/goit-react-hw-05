import axios from "axios";

export async function getMovies() {
  const url = "https://api.themoviedb.org/3/trending/movie/week?language=en-US";

  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2QwNzlmN2ZhN2FlZGNlODg3NmVhYzM4ODM4YmQwOCIsInN1YiI6IjY2MmFjOTcwNWMwNzFiMDExYzVlMzQwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l-i9BNl9MO0CHen2pbolUFDfjcc1pTZPeoKjPjjw3_U",
      accept: "application/json",
    },
  };

  try {
    const response = await axios.get(url, options);
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
}

export async function getSource() {
  const url = "https://api.themoviedb.org/3/configuration";

  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2QwNzlmN2ZhN2FlZGNlODg3NmVhYzM4ODM4YmQwOCIsInN1YiI6IjY2MmFjOTcwNWMwNzFiMDExYzVlMzQwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l-i9BNl9MO0CHen2pbolUFDfjcc1pTZPeoKjPjjw3_U",
      accept: "application/json",
    },
  };

  try {
    const response = await axios.get(url, options);
    return response.data.images;
  } catch (error) {
    console.error(error);
  }
}

export async function getDetails(movie_id) {
  const url = `https://api.themoviedb.org/3/movie/${movie_id}?append_to_response=videos,images&language=en-US`;

  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2QwNzlmN2ZhN2FlZGNlODg3NmVhYzM4ODM4YmQwOCIsInN1YiI6IjY2MmFjOTcwNWMwNzFiMDExYzVlMzQwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l-i9BNl9MO0CHen2pbolUFDfjcc1pTZPeoKjPjjw3_U",
      accept: "application/json",
    },
  };

  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

export async function getCast(movie_id) {
  const url = `https://api.themoviedb.org/3/movie/${movie_id}/credits?language=en-US`;

  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2QwNzlmN2ZhN2FlZGNlODg3NmVhYzM4ODM4YmQwOCIsInN1YiI6IjY2MmFjOTcwNWMwNzFiMDExYzVlMzQwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l-i9BNl9MO0CHen2pbolUFDfjcc1pTZPeoKjPjjw3_U",
      accept: "application/json",
    },
  };

  try {
    const response = await axios.get(url, options);
    return response.data.cast;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getReviews(movie_id) {
  const url = `https://api.themoviedb.org/3/movie/${movie_id}/reviews?language=en-US&page=1`;

  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2QwNzlmN2ZhN2FlZGNlODg3NmVhYzM4ODM4YmQwOCIsInN1YiI6IjY2MmFjOTcwNWMwNzFiMDExYzVlMzQwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l-i9BNl9MO0CHen2pbolUFDfjcc1pTZPeoKjPjjw3_U",
      accept: "application/json",
    },
  };

  try {
    const response = await axios.get(url, options);
    return response.data.results;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getSearch(query) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2QwNzlmN2ZhN2FlZGNlODg3NmVhYzM4ODM4YmQwOCIsInN1YiI6IjY2MmFjOTcwNWMwNzFiMDExYzVlMzQwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l-i9BNl9MO0CHen2pbolUFDfjcc1pTZPeoKjPjjw3_U",
      accept: "application/json",
    },
  };

  try {
    const response = await axios.get(url, options);
    return response.data.results;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
