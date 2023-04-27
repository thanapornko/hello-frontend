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
import validatePersonal from "../validators/validatePersonal";
import * as userApi from "../apis/userApi";
import useAuth from "../hooks/useAuth";

export default function PersonalPage() {
  const { authenticatedUser } = useAuth();
  const initialInput = {
    firstName: "",
    lastName: "",
    idCard: "",
    telephone: "",
    id: authenticatedUser ? authenticatedUser.id : null
  };
  const [input, setInput] = useState(initialInput);
  const [error, setError] = useState({});

  const navigate = useNavigate();

  const handleInputChange = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSaveClick = async e => {
    try {
      e.preventDefault();
      const result = validatePersonal(input);
      if (result) {
        // console.log(result, "result");
        setError(result);
      } else {
        setError({});
        await userApi.addUserInfo(input);
        toast.success("Successfully Updated!");
        navigate("/physicalinfo");
      }
    } catch (err) {
      console.log(err);
      if (
        err.response &&
        err.response.data &&
        err.response.data.error ===
          "id card is already in use"
      ) {
        setError({
          idCard: "id card is already in use"
        });
      }
    }
  };

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <>
      <Container>
        <Box>
          <FormInfoWrapper>
            <FormText>First name</FormText>
            <FormInput
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              value={input.firstName}
              onChange={handleInputChange}
            />
            <ErrorText>{error?.firstName}</ErrorText>
          </FormInfoWrapper>
          <FormInfoWrapper>
            <FormText>Last name</FormText>
            <FormInput
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              value={input.lastName}
              onChange={handleInputChange}
            />
            <ErrorText>{error?.lastName}</ErrorText>
          </FormInfoWrapper>
          <FormInfoWrapper>
            <FormText>Id card</FormText>
            <FormInput
              type="text"
              name="idCard"
              placeholder="Enter your id card"
              value={input.idCard}
              onChange={handleInputChange}
            />
            <ErrorText>{error?.idCard}</ErrorText>
          </FormInfoWrapper>
          <FormInfoWrapper>
            <FormText>Telephone</FormText>
            <FormInput
              type="text"
              name="telephone"
              placeholder="Enter your telephone number"
              value={input.telephone}
              onChange={handleInputChange}
            />
            <ErrorText>{error?.telephone}</ErrorText>
          </FormInfoWrapper>
          <ButtonWrapper>
            <GrayButton onClick={handleBackClick}>
              Back
            </GrayButton>
            <GreenButton onClick={handleSaveClick}>
              Save
            </GreenButton>
          </ButtonWrapper>
        </Box>
      </Container>
    </>
  );
}
