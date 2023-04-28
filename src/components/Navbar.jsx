import {
  SideBar,
  SideBarLink,
  NavBar,
  NavBarTitle,
  LogoutIcon
} from "../styles/styledElements";
import { useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Layout() {
  const { logout } = useAuth();

  const location = useLocation();

  return (
    <>
      <NavBar>
        <NavBarTitle>User Management</NavBarTitle>
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
          href="/avgchart"
          className={
            location.pathname === "/avgchart"
              ? "active"
              : ""
          }>
          Average Chart
        </SideBarLink>
        <SideBarLink
          onClick={() => {
            logout();
          }}>
          Logout
          <LogoutIcon className="fa-solid fa-right-from-bracket" />
        </SideBarLink>
      </SideBar>
    </>
  );
}
