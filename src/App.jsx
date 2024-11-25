import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./pages/Home";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { ThemeContext } from "./context/ThemeContext";
import AddStudent from "./pages/AddStudent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { userStatus } = useContext(UserContext);
  const { currTheme } = useContext(ThemeContext);
  const ProtectedRoutes = ({ children }) => {
    return userStatus !== null ? children : <Navigate to="/" />;
  };

  return (
    <div className={currTheme}>
      <ToastContainer />
      {userStatus === null ? "" : <Navbar />}

      <Routes>
        <Route path="/" element={userStatus === null ? <Login /> : <Home />} />
        <Route
          path="/home"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/addstd"
          element={
            <ProtectedRoutes>
              <AddStudent />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
