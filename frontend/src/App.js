/* eslint-disable react/jsx-filename-extension */

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import menuItems from "./fakeApi/menuItems";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AuthProvider from "./context/AuthContext/AuthProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header menuItem={menuItems} />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={(
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            )}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
