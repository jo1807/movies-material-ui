import { IFilmCompaniesData, IMovieData } from "./types";

export const getFilmCompanyNameById = (
  id: string,
  companies: IFilmCompaniesData[]
) => {
  return companies.find((company) => company.id === id)?.name;
};

export const getAverage = (valueSet: number[]) => {
  const total = valueSet.reduce((acc, value) => {
    return value + acc;
  }, 0);

  const result = total / valueSet.length;
  return result.toFixed(1);
};

export const mapMovieData = (
  movies: IMovieData[],
  companies: IFilmCompaniesData[]
) => {
  return movies.map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      averageReviewScore: getAverage(movie.reviews),
      filmCompany: getFilmCompanyNameById(movie.filmCompanyId, companies),
    };
  });
};
