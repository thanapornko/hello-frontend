import {
  Box,
  SwitchBox,
  Option,
  Title,
  FormText,
  FormInput,
  FormInputWrapper,
  Button,
  EyeIcon
} from "../styles/styledElements";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../styles/layoutStyled";
import useAuth from "../hooks/useAuth";

export default function LoginPage() {
  const { login, authenticatedUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const toggleShowPassword = e => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (redirect) {
      if (authenticatedUser.isAdmin) {
        navigate("/userManagement");
      } else if (authenticatedUser.isNewUser) {
        navigate("/personalinfo");
      } else {
        navigate("/physicalinfo");
      }
    }
  }, [redirect, authenticatedUser, navigate]);

  const handleLoginClick = async e => {
    try {
      e.preventDefault();
      await login(email, password);
      toast.success("Welcome");
      setRedirect(true);
    } catch (err) {
      // console.log("---err---", err.response);
      toast.error("Invalid email or password");
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
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormInputWrapper>
          <FormInputWrapper>
            <FormText>Password</FormText>
            <FormInput
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <EyeIcon
              className={`fa-solid ${
                showPassword ? "fa-eye-slash" : "fa-eye"
              }`}
              onClick={toggleShowPassword}
            />
          </FormInputWrapper>
          <Button onClick={handleLoginClick}>Login</Button>
        </Box>
      </Container>
    </>
  );
}
