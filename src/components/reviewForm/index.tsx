import { FormControl, Input } from "@mui/base";
import { FormHelperText, InputLabel, useMediaQuery } from "@mui/material";
import { useState } from "react";

const FormContent = () => {
  return (
    <FormControl>
      <InputLabel htmlFor="my-input">Please write a review</InputLabel>
      <Input id="my-input" aria-describedby="my-helper-text" />
      <FormHelperText id="my-helper-text">
        We'll never share your email.
      </FormHelperText>
    </FormControl>
  );
};

//mobiel
//error state 100
//post - loading and error states
//style
export const ReviewForm = ({ selectedMovie, getMovies }: any) => {
  const isMobile = useMediaQuery(`(max-width: 600px)`);
  const [showModal, setShowModal] = useState(false);
  //show form
  //show model

  const handlesSubmit = () => {
    //fetch post
  };
  if (isMobile) {
    return <div></div>;
  }
  return <FormContent />;
};
