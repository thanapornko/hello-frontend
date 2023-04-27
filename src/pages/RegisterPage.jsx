import {
  Box,
  SwitchBox,
  Option,
  Title,
  FormText,
  FormInput,
  ErrorText,
  FormInputWrapper,
  Button,
  EyeIcon
} from "../styles/styledElements";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../styles/layoutStyled";
import validateRegister from "../validators/validateRegister";
import * as authApi from "../apis/authApi";

export default function RegisterPage() {
  const initialInput = {
    email: "",
    password: ""
  };
  const [input, setInput] = useState(initialInput);
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = e => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleChangeInput = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async e => {
    try {
      e.preventDefault();
      // console.log("---input---", input);
      const result = validateRegister(input);
      // console.log("---result---", result);
      if (result) {
        setError(result);
      } else {
        setError({});
        await authApi.register(input);
        setInput(initialInput);
        toast.success("Successfully Registerd!");
        navigate("/");
      }
    } catch (err) {
      toast.error("Email is already in use");
    }
  };

  return (
    <>
      <Container>
        <Box>
          <SwitchBox>
            <Option to="/">Login</Option>
            <Option to="/register">Register</Option>
          </SwitchBox>
          <Title>Hello!</Title>
          <FormInputWrapper>
            <FormText>Email</FormText>
            <FormInput
              type="text"
              name="email"
              placeholder="email"
              value={input.email}
              onChange={handleChangeInput}
            />
            <ErrorText>{error?.email}</ErrorText>
          </FormInputWrapper>
          <FormInputWrapper>
            <FormText>Password</FormText>
            <FormInput
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="password"
              value={input.password}
              onChange={handleChangeInput}
            />
            <EyeIcon
              className={`fa-solid ${
                showPassword ? "fa-eye-slash" : "fa-eye"
              }`}
              onClick={toggleShowPassword}
            />
            <ErrorText>{error?.password}</ErrorText>
          </FormInputWrapper>
          <Button onClick={handleSubmitForm}>
            Register
          </Button>
        </Box>
      </Container>
    </>
  );
}
