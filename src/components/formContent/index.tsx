import { useState } from "react";

import { FormControl } from "@mui/base";
import {
  Button,
  CircularProgress,
  FormHelperText,
  InputLabel,
  TextField,
} from "@mui/material";

interface IFormContent {
  isLoading: boolean;
  isSubmitted: boolean;
  isError: boolean;
  successMessage: string;
  handlesSubmit: (review: string) => void;
  setIsSubmitted: (value: boolean) => void;
  setIsError: (value: boolean) => void;
  setSelectedMovie: (value: null) => void;
  getMovies: () => void;
}

export const FormContent = ({
  isLoading,
  isSubmitted,
  isError,
  successMessage,
  handlesSubmit,
  setIsSubmitted,
  setIsError,
  setSelectedMovie,
  getMovies,
}: IFormContent) => {
  const [review, setReview] = useState("");
  const [showErrorValidation, setShowErrorValidation] = useState(false);

  const handleClick = () => {
    if (!review || review.length > 100) {
      return setShowErrorValidation(true);
    }
    return handlesSubmit(review);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isSubmitted) {
    return (
      <div>
        <p>
          {successMessage
            ? successMessage
            : "Thank you! Your review has been successfully submitted."}
        </p>
        <Button
          onClick={() => {
            setIsSubmitted(false);
            setSelectedMovie(null);
            getMovies();
          }}
          style={{ backgroundColor: "#2343D7", color: "white" }}
        >
          Select another movie to review
        </Button>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <p>Sorry, it looks like something has gone wrong. Please try again.</p>
        <Button
          onClick={() => {
            setIsError(false);
            setSelectedMovie(null);
          }}
          style={{ backgroundColor: "#2343D7", color: "white" }}
        >
          Try agian
        </Button>
      </div>
    );
  }
  return (
    <>
      <FormControl style={{ width: "80%" }}>
        <InputLabel htmlFor="my-input">Please write a review</InputLabel>
        <TextField
          multiline
          style={{ width: "80%", margin: "20px 0 10px" }}
          error={showErrorValidation}
          id="my-input"
          aria-describedby="my-helper-text"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setReview(event.target.value);
            setShowErrorValidation(false);
          }}
        />
        {showErrorValidation ? (
          <FormHelperText
            style={{ fontSize: "15px", color: "#B21010", marginBottom: "10px" }}
          >
            {review.length > 100
              ? "Please enter a review less than 100 characters"
              : "Please enter a review to submit"}
          </FormHelperText>
        ) : (
          ""
        )}
      </FormControl>
      <Button
        onClick={handleClick}
        style={{ backgroundColor: "#2343D7", color: "white" }}
      >
        Submit
      </Button>
    </>
  );
};
