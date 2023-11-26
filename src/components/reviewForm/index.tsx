import { useEffect, useState } from "react";
import { Box, Modal, Typography, useMediaQuery } from "@mui/material";

import { IMappedMovieData } from "../../utils/types";
import { FormContent } from "../formContent";

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

interface IReviewForm {
  selectedMovie: IMappedMovieData;
  setSelectedMovie: (value: IMappedMovieData | null) => void;
}

export const ReviewForm = ({
  selectedMovie,
  setSelectedMovie,
}: IReviewForm) => {
  const isMobile = useMediaQuery(`(max-width: 600px)`);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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
      const { message } = await response.json();
      if (response.ok) {
        setSuccessMessage(message);
        setIsSubmitted(true);
        setIsLoading(false);
        return;
      }
      setIsError(true);
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
            successMessage={successMessage}
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
      successMessage={successMessage}
    />
  );
};
