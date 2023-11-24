export interface IMovieData {
    cost: number;
    filmCompanyId: string;
    id: string;
    releaseYear: number;
    reviews: number[];
    title: string
  }
  
export interface IFilmCompaniesData {
    id: string;
    name: string;
  }