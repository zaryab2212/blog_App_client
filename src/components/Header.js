import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext, UserContextProvider } from "../context/userContext";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLogOut, setisLogOut] = useState(false);

  const handleLogOut = async () => {
    if (!isLogOut) {
      const { data } = await axios.get("/auth/logout");
      if (data.success) {
        alert("user Logged Out");
        setUserInfo(null);
        navigate("/login");
      }
    }
  };
  // useEffect(() => {
  //   const getuser = async () => {
  //     const { data } = await axios.get("/auth/profile");
  //     console.log(data);
  //     if (data.success) {
  //       setUserInfo(data.user);
  //     }
  //     getuser();
  //   };
  // }, [userInfo, setUserInfo]);

  return (
    <>
      {/* {!isLogOut && <Navigate to="/login"></Navigate>} */}
      <nav className="navbar py-3 px-3 navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" href="#">
            <b> Blog App </b>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Home
                </Link>
              </li>
            </ul>
            {userInfo && (
              <>
                <p className="mt-3 mx-2">
                  Hello! @<b style={{ color: "red" }}>{userInfo?.name}</b>
                </p>
                <Link to="/create-post">
                  {" "}
                  <button className="btn btn-outline-light mx-2 bg-success">
                    Create New Post
                  </button>
                </Link>
              </>
            )}
            {userInfo && (
              <button
                onClick={handleLogOut}
                className="btn btn-outline-success mx-2 bg-light"
              >
                Log Out
              </button>
            )}
            {!userInfo && (
              <Link to="/login">
                <button className="btn btn-outline-success mx-2">
                  Sign IN
                </button>
              </Link>
            )}
            {!userInfo && (
              <Link to="/register">
                <button className="btn btn-outline-success mx-2" type="submit">
                  Register
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
