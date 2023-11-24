import { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { IMappedMovieData } from "../../utils/types";

interface IMoviesTableProps {
  movieData: IMappedMovieData[];
  selectedMovie: IMappedMovieData | null;
  handleSelectMovie: (movie: IMappedMovieData) => void;
}

// const [order, setOrder] = useState<Order>('asc');
// const [orderBy, setOrderBy] = React.useState<keyof Data>('calories');

export const MoviesTable = ({
  movieData,
  selectedMovie,
  handleSelectMovie,
}: IMoviesTableProps) => {
  console.log("movieData", movieData);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="right">Review</StyledTableCell>
            <StyledTableCell align="right">Company Name</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {movieData.map((movie: any) => (
            <StyledTableRow
              hover
              key={movie.title}
              selected={movie.id === selectedMovie?.id}
              onClick={() => handleSelectMovie(movie)}
            >
              <StyledTableCell component="th" scope="row">
                {movie.title}
              </StyledTableCell>
              <StyledTableCell align="right">
                {movie.averageReviewScore}
              </StyledTableCell>
              <StyledTableCell align="right">
                {movie.filmCompany}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
