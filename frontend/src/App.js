/* eslint-disable react/jsx-filename-extension */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AuthProvider from "./context/AuthContext/AuthProvider";
import Tasks from "./pages/Tasks";
import SignUp from "./pages/SignUp";
import SignOut from "./pages/SignOut";
import { adminRoutes } from "./fakeApi/menuItems";
import Edit from "./pages/Admin/pages/Edit";
import AllTask from "./pages/Admin/pages/AllTasks";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route
            path={adminRoutes.newTask}
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${adminRoutes.allTask}`}
            element={
              <ProtectedRoute>
                <AllTask />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${adminRoutes.editTask}/:taskId`}
            element={
              <ProtectedRoute>
                <Edit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
