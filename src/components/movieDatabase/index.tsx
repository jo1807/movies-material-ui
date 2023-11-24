import { Typography } from "@mui/material";
import { useState } from "react";

import { mapMovieData } from "../../utils/helpers";
import { MoviesTable } from "../moviesTable";
import { ReviewForm } from "../reviewForm";
import {
  IFilmCompaniesData,
  IMappedMovieData,
  IMovieData,
} from "../../utils/types";

interface IMovieDataBase {
  movies: IMovieData[];
  filmCompanies: IFilmCompaniesData[];
}

export const MovieDataBase = ({ movies, filmCompanies }: IMovieDataBase) => {
  const [selectedMovie, setSelectedMovie] = useState<IMappedMovieData | null>(
    null
  );

  const mappedMovies = mapMovieData(movies, filmCompanies);
  const handleSelectMovie = (movie: IMappedMovieData) =>
    setSelectedMovie(movie);

  return (
    <>
      <h1>Welcome to Movie database!</h1>
      <Typography style={{ fontSize: "20px", marginBottom: "10px" }}>
        Total movies displayed: {movies.length}
      </Typography>

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
        <ReviewForm
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
        />
      ) : null}
    </>
  );
};
