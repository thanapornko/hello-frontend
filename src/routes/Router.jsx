import {
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import PersonalPage from "../pages/PersonalPage";
import PhysicalPage from "../pages/PhysicalPage";
import UserManagementPage from "../pages/UserManagementPage";
import DailyRecordPage from "../pages/DailyRecordPage";

import AdminProtectedRoute from "../features/auth/AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/personalinfo",
    element: <PersonalPage />
  },
  {
    path: "/physicalinfo",
    element: <PhysicalPage />
  },

  {
    path: "/usermanagement",
    element: (
      <AdminProtectedRoute>
        <UserManagementPage />
      </AdminProtectedRoute>
    )
  },
  {
    path: "/dailyrecord",
    element: (
      <AdminProtectedRoute>
        <DailyRecordPage />
      </AdminProtectedRoute>
    )
  }
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
