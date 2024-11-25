import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { UserContext } from "../context/UserContext";
import { Tilt } from "react-tilt";

const Login = () => {
  const [userData, setUserData] = useState({});
  const { handleUserStatus } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then((response) => {
        handleUserStatus(response.user);
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <section className="login">
      <Tilt>
        <form onSubmit={handleSignin}>
          <h2>Admin Login Panel</h2>
          <input
            type="email"
            name="email"
            placeholder="Email..."
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password..."
            onChange={handleChange}
          />
          <button type="submit">Sign In</button>
        </form>
      </Tilt>
    </section>
  );
};

export default Login;
