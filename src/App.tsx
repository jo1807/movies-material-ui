import { useCallback, useEffect, useRef, useState } from "react";
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
    console.log("hello");
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

  const getMoviesCallback = useCallback(getMovies, []);

  useEffect(() => {
    setIsLoading(true);
    getMoviesCallback();
  }, [getMoviesCallback]);

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
      getMovies={getMovies}
    />
  );
};

{
  /* {refreshButton("Refresh")}
      <Button>Hello</Button> */
}

//      <span>Title - Review - Film Company</span>

// {mockMovieData.map((movie: any) =>
//   <span onClick={() => {setSelectedMovie(movie)}}>
//     {movie.title}{" "}
//     {movie.reviews.reduce((acc: any, i: any) => (acc + i)/movie.reviews.length, 0)?.toString().substring(0, 3)}{" "}
//     {mockMovieCompanyData.find((f: any) => f.id === movie.filmCompanyId)?.name}
//     <br/>
//   </span>
// )}

{
  /* {selectedMovie ? selectedMovie.title as any ? "You have selected " +  selectedMovie.title  as any : "No Movie Title" : "No Movie Seelcted"} */
}

// const refreshButton = (buttonText: any) => {
//   if (mockMovieCompanyData) {
//     return <button>{buttonText}</button>
//   } else {
//     return <p>No movies loaded yet</p>
//   }
// };
