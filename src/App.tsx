import { useCallback, useEffect, useState } from "react";
import { ErrorContent } from "./components/errorPage";
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
    try {
      setIsLoading(true);
      const moviesRes = await fetch("http://localhost:3000/movies");
      const movieCompaniesRes = await fetch(
        "http://localhost:3000/movieCompanies"
      );

      if (moviesRes.status === 500 || movieCompaniesRes.status === 500) {
        console.log(moviesRes.status);
        setIsLoading(false);
        setHasError(true);
      }
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
    return <ErrorContent setHasError={setHasError} getMovies={getMoviesCB} />;
  }

  return (
    <MovieDataBase
      movies={allMovies}
      filmCompanies={allMovieCompanies}
      getMovies={getMoviesCB}
    />
  );
};
