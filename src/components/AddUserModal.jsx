import {
  AddUserModal,
  CloseButton,
  FormAddUserWrapper,
  FormInput,
  FormText,
  GreenButton,
  ButtonWrapper,
  ErrorText
} from "../styles/styledElements";
import { toast } from "react-toastify";
import { useState } from "react";
import validatePersonal from "../validators/validatePersonal";
import * as userApi from "../apis/userApi";
import useUser from "../hooks/useUser";

export default function UserModal({
  showModal,
  handleCloseModal
}) {
  const [error, setError] = useState({});
  const { addUser } = useUser();
  const initialInput = {
    firstName: "",
    lastName: "",
    telephone: "",
    idCard: ""
  };
  const [input, setInput] = useState(initialInput);

  const handleInputChange = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async e => {
    try {
      e.preventDefault();
      const result = validatePersonal(input);
      if (result) {
        setError(result);
      } else {
        setError({});
        const newUser = await userApi.addUserInfo(input);
        addUser(newUser);
        toast.success("Successfully Updated!");
        handleCloseModal();
      }
    } catch (err) {
      console.log("---err---", err);
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

  return (
    <>
      <AddUserModal
        isOpen={showModal}
        contentLabel="Minimal Modal Example">
        <CloseButton onClick={handleCloseModal}>
          X
        </CloseButton>
        <FormAddUserWrapper>
          <FormText>First name</FormText>
          <FormInput
            type="text"
            name="firstName"
            placeholder="Enter your first name"
            value={input.firstName}
            onChange={handleInputChange}
          />
          <ErrorText>{error?.firstName}</ErrorText>
        </FormAddUserWrapper>
        <FormAddUserWrapper>
          <FormText>Last name</FormText>
          <FormInput
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            value={input.lastName}
            onChange={handleInputChange}
          />
          <ErrorText>{error?.lastName}</ErrorText>
        </FormAddUserWrapper>
        <FormAddUserWrapper>
          <FormText>Id card</FormText>
          <FormInput
            type="text"
            name="idCard"
            placeholder="Enter your id card"
            value={input.idCard}
            onChange={handleInputChange}
          />
          <ErrorText>{error?.idCard}</ErrorText>
        </FormAddUserWrapper>
        <FormAddUserWrapper>
          <FormText>Telephone</FormText>
          <FormInput
            type="text"
            name="telephone"
            placeholder="Enter your telephone number"
            value={input.telephone}
            onChange={handleInputChange}
          />
          <ErrorText>{error?.telephone}</ErrorText>
        </FormAddUserWrapper>{" "}
        <ButtonWrapper>
          <GreenButton onClick={handleFormSubmit}>
            Submit
          </GreenButton>
        </ButtonWrapper>
      </AddUserModal>
    </>
  );
}
