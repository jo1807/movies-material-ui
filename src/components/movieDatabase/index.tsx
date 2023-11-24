import { useState } from "react";

import { mapMovieData } from "../../utils/helpers";
import { IFilmCompaniesData, IMovieData } from "../../utils/types";
import { MoviesTable } from "../moviesTable";
import { ReviewForm } from "../reviewForm";
import "./index.css";

interface IMovieDataBase {
  movies: IMovieData[];
  filmCompanies: IFilmCompaniesData[];
  getMovies: () => void;
}

export const MovieDataBase = ({
  movies,
  filmCompanies,
  getMovies,
}: IMovieDataBase) => {
  const [selectedMovie, setSelectedMovie] = useState<IMovieData | null>(null);

  const mappedMovies = mapMovieData(movies, filmCompanies);
  const handleSelectMovie = (movie: IMovieData) => setSelectedMovie(movie);

  return (
    <>
      <h1>Welcome to Movie database!</h1>
      <p className="text">Total movies displayed: {movies.length}</p>

      <MoviesTable
        movieData={mappedMovies}
        selectedMovie={selectedMovie}
        handleSelectMovie={handleSelectMovie}
      />

      {selectedMovie ? (
        <p className="text">{`You have selected ${selectedMovie?.title}`}</p>
      ) : (
        <p className="text">No Movie Selected</p>
      )}

      {selectedMovie ? (
        <ReviewForm selectedMovie={selectedMovie} getMovies={getMovies} />
      ) : null}
    </>
  );
};
