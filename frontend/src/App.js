/* eslint-disable react/jsx-filename-extension */
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AuthProvider from "./context/AuthContext/AuthProvider";
import Tasks from "./pages/Tasks";
import SignUp from "./pages/SignUp";
import SignOut from "./pages/SignOut";
import { adminRoutes } from "./fakeApi/menuItems";
import { AdminPages } from "./pages/Admin";
import EditPage from "./pages/Admin/pages/Edit";
import Pdf from "./pages/Pdf";
import SizeContextProvider from "./context/SizeContext";

function GetPageComponent({ pageName }) {
  return AdminPages[pageName]();
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SizeContextProvider>
          <Header />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/pdf" element={<Pdf />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signout" element={<SignOut />} />
            <Route path="/tasks" element={<Tasks />} />
            {adminRoutes.map(({ path, name, PageComponent }) => (
              <Route
                path={path}
                key={name}
                element={
                  <ProtectedRoute>
                    <GetPageComponent key={name} pageName={PageComponent} />
                  </ProtectedRoute>
                }
              />
            ))}
            <Route
              path="/admin/task/:taskId"
              element={
                <ProtectedRoute>
                  <EditPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </SizeContextProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
