import { Button } from "@mui/material";

interface IErrorContent {
  setHasError: (val: boolean) => void;
  getMovies: () => void;
}

export const ErrorContent = ({ setHasError, getMovies }: IErrorContent) => {
  return (
    <p className="text">
      Oh no, it looks like something went wrong. Please try agian.
      <Button
        style={{
          marginTop: "20px",
          backgroundColor: "#2343D7",
          color: "white",
        }}
        onClick={() => {
          setHasError(false);
          getMovies();
        }}
      >
        Refresh movies
      </Button>
    </p>
  );
};
