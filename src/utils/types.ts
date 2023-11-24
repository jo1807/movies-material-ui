export interface IMovieData {
  cost: number;
  filmCompanyId: string;
  id: string;
  releaseYear: number;
  reviews: number[];
  title: string;
}

export interface IFilmCompaniesData {
  id: string;
  name: string;
}

export interface IMappedMovieData {
  id: string;
  averageReviewScore: string;
  filmCompany: string | undefined;
  title: string;
}
