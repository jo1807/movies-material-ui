import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import { IMappedMovieData } from "../../utils/types";

interface IMoviesTableProps {
  movieData: IMappedMovieData[];
  selectedMovie: IMappedMovieData | null;
  handleSelectMovie: (movie: IMappedMovieData) => void;
}

const columns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 200 },
  { field: "averageReviewScore", headerName: "Avg Review Score", width: 200 },
  {
    field: "filmCompany",
    headerName: "Film Company",
    width: 200,
  },
];

export const MoviesTable = ({
  movieData,
  handleSelectMovie,
}: IMoviesTableProps) => {
  const handleEvent: GridEventListener<"rowClick"> = (params) => {
    handleSelectMovie(params.row);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        onRowClick={handleEvent}
        style={{
          backgroundColor: "white",
        }}
        rows={movieData}
        columns={columns}
      />
    </div>
  );
};
