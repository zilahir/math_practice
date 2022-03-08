/* eslint-disable react/jsx-filename-extension */

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import menuItems from "./fakeApi/menuItems";

function App() {
  return (
    <BrowserRouter>
      <Header menuItem={menuItems} />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
