import {
  Box,
  FormInfoWrapper,
  FormInput,
  FormText,
  GreenButton,
  GrayButton,
  ButtonWrapper,
  ErrorText
} from "../styles/styledElements";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../styles/layoutStyled";
import validatePhysical from "../validators/validatePhysical";
import * as userApi from "../apis/userApi";
import useAuth from "../hooks/useAuth";

export default function PhysicalPage() {
  const { authenticatedUser } = useAuth();
  const initialInput = {
    height: "",
    weight: "",
    waist: "",
    date: "",
    userId: authenticatedUser ? authenticatedUser.id : null
  };
  const [input, setInput] = useState(initialInput);
  const [error, setError] = useState({});

  const navigate = useNavigate();

  const handleInputChange = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleBackClick = () => {
    navigate("/");
  };

  const handleFormSubmit = async e => {
    try {
      e.preventDefault();
      const result = validatePhysical(input);
      if (result) {
        // console.log(result, "result");
        setError(result);
      } else {
        setError({});
        const response = await userApi.addUserPhysical(
          input
        );
        if (response.error) {
          setError(response.error);
        } else {
          toast.success("Successfully!");
          navigate("/");
        }
      }
    } catch (err) {
      toast.error(err?.response.data.error);
    }
  };

  return (
    <>
      <Container>
        <Box>
          <FormInfoWrapper>
            <FormText>Height(cm)</FormText>
            <FormInput
              type="text"
              name="height"
              placeholder="Enter your height"
              value={input.height}
              onChange={handleInputChange}
            />
            <ErrorText>{error?.height}</ErrorText>
          </FormInfoWrapper>
          <FormInfoWrapper>
            <FormText>Weight(kg)</FormText>
            <FormInput
              type="text"
              name="weight"
              placeholder="Enter your weight"
              value={input.weight}
              onChange={handleInputChange}
            />
            <ErrorText>{error?.weight}</ErrorText>
          </FormInfoWrapper>
          <FormInfoWrapper>
            <FormText>Waist(inch)</FormText>
            <FormInput
              type="text"
              name="waist"
              placeholder="Enter your waist"
              value={input.waist}
              onChange={handleInputChange}
            />
            <ErrorText>{error?.waist}</ErrorText>
          </FormInfoWrapper>
          <FormInfoWrapper>
            <FormText>Date</FormText>
            <FormInput
              type="date"
              name="date"
              value={input.date}
              onChange={handleInputChange}
            />
            <ErrorText>{error?.date}</ErrorText>
          </FormInfoWrapper>
          <ButtonWrapper>
            <GrayButton onClick={handleBackClick}>
              Exit
            </GrayButton>
            <GreenButton onClick={handleFormSubmit}>
              Submit
            </GreenButton>
          </ButtonWrapper>
        </Box>
      </Container>
    </>
  );
}
