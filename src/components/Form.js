import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Form = ({ mode = "register" }) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === "register") {
      const { data } = await axios.post("/auth/create", {
        name,
        email,
        password,
      });
      if (data.success) {
        alert("user created");
        navigate("/login");
      }
    }
    if (mode === "login") {
      const { data } = await axios.post("/auth/login", {
        email,
        password,
      });
      if (data.success) {
        setUserInfo(data.findUser);
        alert("user Loged In");
        navigate("/");
      }
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="m-auto my-4 text-center"> Login</h1>
        <form onSubmit={handleSubmit}>
          {mode === "register" && (
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                name="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
                type="string"
                className="form-control"
                id="name"
              />
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              name="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              name="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <button
            type="submit"
            className="btn w-100 btn-primary b-white color-black"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
