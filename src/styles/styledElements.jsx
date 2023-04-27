import ReactModal from "react-modal";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

/// Login Page / Register Page
export const Box = styled.div`
  background: white;
  height: 500px;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: monospace;
  border: 2px solid black;
  border-radius: 4%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  padding: 10px;
`;
export const SwitchBox = styled.div`
  width: 250px;
  height: 40px;
  background-color: white;
  border: 1px solid black;
  border-radius: 12px;
  margin-top: 40px;
  display: flex;
  align-items: center;
`;
export const Option = styled(NavLink)`
  width: 125px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: #333;
  text-decoration: double;
  font-weight: bold;
  font-size: 0.8rem;
  transition: all 0.3s ease-in-out;
  &.active {
    background-color: black;
    color: white;
  }
`;
export const FormInput = styled.input`
  padding: 10px;
  width: 300px;
  font-size: 1rem;
  border-radius: 4px;
  border: 2px solid #b9b9b9;
`;
export const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #000;
  margin: 30px 0px 0px;
`;
export const FormText = styled.p`
  align-self: flex-start;
  margin: 8px 0px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #000;
`;
export const FormInputWrapper = styled.div`
  margin: 14px 0px;
  position: relative;
`;
export const ErrorText = styled.p`
  align-self: flex-start;
  margin: 2px 2px;
  font-size: 0.8rem;
  color: #c00505;
  position: absolute;
  top: 100%;
  left: 0;
`;
export const EyeIcon = styled.i`
  font-size: 1.2rem;
  cursor: pointer;
  position: absolute;
  right: 12px;
  bottom: 12px;
`;
export const Button = styled.button`
  background-color: #0077b6;
  color: #fff;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  margin-top: 30px;
  cursor: pointer;
  &:hover {
    background-color: #023e8a;
  }
`;

/// Personal info / Physical info
export const GreenButton = styled(Button)`
  background-color: green;
  margin-top: 18px;
  &:hover {
    background-color: #015301;
  }
`;
export const GrayButton = styled(Button)`
  background-color: #686868;
  margin-top: 18px;
  &:hover {
    background-color: #474747;
  }
`;
export const FormInfoWrapper = styled(FormInputWrapper)`
  margin: 12px 0px;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  width: 60%;
  justify-content: space-around;
`;

/// User Management Layout
export const SideBar = styled.div`
  background-color: #c6c7c7;
  height: 100vh;
  width: 180px;
  position: fixed;
  top: 0;
  left: 0;
  margin-top: 71.68px;
  padding: 50px;
  z-index: 0;
  font-family: monospace;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.3);
`;
export const SideBarLink = styled.a`
  display: flex;
  color: black;
  font-weight: bold;
  text-decoration: none;
  border-bottom: 1px solid black;
  padding-bottom: 16px;
  margin-bottom: 40px;
  font-size: 1.3rem;
  text-align: center;
  cursor: pointer;
  &:hover {
    color: #946969;
  }
  &.active {
    color: #681e1e;
  }
`;
export const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000000;
  width: 100%;
  padding: 0 20px;
  position: fixed;
  box-sizing: border-box;
  z-index: 0;
  font-family: monospace;
`;
export const NavBarTitle = styled.h1`
  color: white;
  font-size: 1.8rem;
  font-weight: bold;
  margin-left: 30px;
  cursor: default;
`;
export const AddNewUserButton = styled.button`
  background-color: green;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #076107;
  }
`;
export const UserIcon = styled.i`
  margin-left: 4px;
  font-size: 1.1rem;
`;
export const LogoutIcon = styled(UserIcon)`
  margin-left: 10px;
  font-size: 1.5rem;
`;

/// React Modal add new record
export const AddUserModal = styled(ReactModal)`
  position: absolute;
  top: 8%;
  left: 32%;
  right: 32%;
  bottom: 8%;
  background-color: #ffffff;
  border: 2px solid black;
  border-radius: 4%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  padding: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: monospace;
  z-index: 5;
`;
export const CloseButton = styled.button`
  color: #000000;
  background-color: #ffffff;
  padding: 12px 12px;
  border: none;
  font-size: 1.5rem;
  position: absolute;
  top: 12px;
  right: 16px;
  cursor: pointer;
`;
export const FormAddUserWrapper = styled(FormInfoWrapper)`
  margin: 9px 0px;
`;

/// User Management content
export const ContentBox = styled.div`
  margin-left: 280px;
  padding: 130px 100px 100px 100px;
  z-index: 9;
  display: flex;
  justify-content: center;
`;
export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin: 0 auto;
  font-family: monospace;
  font-size: 1rem;
  th,
  td {
    background-color: #96bba7;
    border: 1px solid #dadada;
    padding: 20px;
    text-align: left;
  }
  th {
    background-color: #51976c;
    font-weight: bold;
    padding: 20px;
  }
  tr {
    height: 50px;
  }
`;
export const Icon = styled.i`
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
export const DeleteIcon = styled(Icon)`
  color: #a04242;
  &:hover {
    color: #6b2828;
  }
`;
export const EditIcon = styled(Icon)`
  color: #494949;
  &:hover {
    color: #302b2b;
  }
`;
export const CancelIcon = styled(Icon)`
  color: #585858;
  &:hover {
    color: #353333;
  }
`;
export const SaveIcon = styled(Icon)`
  color: #257548;
  &:hover {
    color: #0e4526;
  }
`;
export const EditInput = styled(FormInput)`
  width: 80%;
`;
export const ValidateText = styled.p`
  margin: 2px 2px;
  font-size: 0.8rem;
  color: #c00505;
  position: absolute;
`;

/// Daily record
export const SortWrapper = styled.div`
  font-family: monospace;
  position: absolute;
  font-size: 1rem;
  left: 380px;
  top: 110px;
`;
export const SortLabel = styled.label`
  margin-right: 8px;
`;
export const RecordBox = styled(ContentBox)`
  padding: 150px 100px 100px 100px;
`;
export const PaginationWrapper = styled.div`
  justify-content: center;
  font-family: monospace;
  font-size: 1rem;
  position: absolute;
  top: 100px;
`;
export const PageButton = styled.button`
  background-color: ${({ active }) =>
    active ? "#007bff" : "transparent"};
  border: 1px solid #007bff;
  color: ${({ active }) => (active ? "#fff" : "#007bff")};
  cursor: pointer;
  margin: 0 0.25rem;
  padding: 0.5rem;
`;
