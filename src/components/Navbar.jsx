import {
  SideBar,
  SideBarLink,
  NavBar,
  NavBarTitle,
  AddNewUserButton,
  UserIcon,
  LogoutIcon
} from "../styles/styledElements";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import UserModal from "../components/AddUserModal";
import useAuth from "../hooks/useAuth";

export default function Layout() {
  const { logout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const location = useLocation();

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <NavBar>
        <NavBarTitle>User Management</NavBarTitle>
        <AddNewUserButton onClick={handleOpenModal}>
          +
          <UserIcon className="fa-solid fa-user" />
        </AddNewUserButton>
      </NavBar>
      <SideBar>
        <SideBarLink
          href="/usermanagement"
          className={
            location.pathname === "/usermanagement"
              ? "active"
              : ""
          }>
          All User
        </SideBarLink>
        <SideBarLink
          href="/dailyrecord"
          className={
            location.pathname === "/dailyrecord"
              ? "active"
              : ""
          }>
          Daily Record
        </SideBarLink>
        <SideBarLink
          onClick={() => {
            logout();
          }}>
          Logout
          <LogoutIcon className="fa-solid fa-right-from-bracket" />
        </SideBarLink>
      </SideBar>
      <UserModal
        isOpen={showModal}
        showModal={showModal}
        setShowModal={setShowModal}
        handleCloseModal={handleCloseModal}
        handleOpenModal={handleOpenModal}
      />
    </>
  );
}
