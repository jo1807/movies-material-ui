import { useEffect, useState } from "react";
import { FormControl } from "@mui/base";
import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  InputLabel,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { IMappedMovieData } from "../../utils/types";

const modalBoxStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface IFormContent {
  isLoading: boolean;
  isSubmitted: boolean;
  isError: boolean;
  handlesSubmit: (review: string) => void;
  setIsSubmitted: (value: boolean) => void;
  setIsError: (value: boolean) => void;
  setSelectedMovie: (value: null) => void;
}

interface IReviewForm {
  selectedMovie: IMappedMovieData;
  setSelectedMovie: (value: IMappedMovieData | null) => void;
}

const FormContent = ({
  isLoading,
  isSubmitted,
  isError,
  handlesSubmit,
  setIsSubmitted,
  setIsError,
  setSelectedMovie,
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
        <p>Thank you! Your review has been successfully submitted.</p>
        <Button
          onClick={() => {
            setIsSubmitted(false);
            setSelectedMovie(null);
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

export const ReviewForm = ({
  selectedMovie,
  setSelectedMovie,
}: IReviewForm) => {
  const isMobile = useMediaQuery(`(max-width: 600px)`);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setShowModal(true);
    }
  }, [selectedMovie]);

  const handlesSubmit = async (review: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/submitReview", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      });
      console.log(response);
      response.ok ? setIsSubmitted(true) : setIsError(true);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      setIsError(true);
    }
  };

  if (showModal || isMobile) {
    return (
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalBoxStyle}>
          <Typography variant="h6" component="h2">
            You have selected: {selectedMovie.title}
          </Typography>
          <FormContent
            handlesSubmit={handlesSubmit}
            isLoading={isLoading}
            isSubmitted={isSubmitted}
            isError={isError}
            setIsSubmitted={setIsSubmitted}
            setIsError={setIsError}
            setSelectedMovie={setSelectedMovie}
          />
        </Box>
      </Modal>
    );
  }
  return (
    <FormContent
      handlesSubmit={handlesSubmit}
      isLoading={isLoading}
      isSubmitted={isSubmitted}
      isError={isError}
      setIsSubmitted={setIsSubmitted}
      setIsError={setIsError}
      setSelectedMovie={setSelectedMovie}
    />
  );
};
