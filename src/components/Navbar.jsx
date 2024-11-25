import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { ThemeContext } from "../context/ThemeContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();

  const { logout } = useContext(UserContext);
  const { handleTheme } = useContext(ThemeContext);

  const handleLogout = async () => {
    await signOut(auth)
      .then(() => {
        toast.success("You have been logged out");
        logout();
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <nav>
        <h1>Student Management System</h1>
        <div>
          <button onClick={handleLogout}>
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "16px",
              }}
            >
              <ion-icon name="log-out-outline"></ion-icon>
            </span>
          </button>
          <button onClick={handleTheme}>Toggle Theme</button>
        </div>
      </nav>
      <hr />
    </>
  );
};

export default Navbar;
