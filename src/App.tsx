import { useCallback, useEffect, useState } from "react";
import { MovieDataBase } from "./components/movieDatabase";
import { IFilmCompaniesData, IMovieData } from "./utils/types";

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [allMovies, setAllMovies] = useState<IMovieData[]>([]);
  const [allMovieCompanies, setAllMovieCompanies] = useState<
    IFilmCompaniesData[]
  >([]);

  const getMovies = async () => {
    setIsLoading(true);
    try {
      const moviesRes = await fetch("http://localhost:3000/movies");
      const movieCompaniesRes = await fetch(
        "http://localhost:3000/movieCompanies"
      );
      const moviesResJson = await moviesRes.json();
      const movieCompaniesJson = await movieCompaniesRes.json();

      setAllMovies(moviesResJson);
      setAllMovieCompanies(movieCompaniesJson);
      setIsLoading(false);
    } catch {
      setHasError(true);
    }
  };

  const getMoviesCB = useCallback(getMovies, []);

  useEffect(() => {
    getMoviesCB();
  }, [getMoviesCB]);

  if (isLoading) {
    return <p className="text">Loading...</p>;
  }

  if (hasError) {
    return (
      <p className="text">
        Oh no, it looks like something went wrong. Please try agian later.
      </p>
    );
  }

  return (
    <MovieDataBase
      movies={allMovies}
      filmCompanies={allMovieCompanies}
      getMovies={getMoviesCB}
    />
  );
};
