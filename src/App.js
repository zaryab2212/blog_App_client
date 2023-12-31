import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Header from "./components/Header";
import { useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "./context/userContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
function App() {
  const { userInfo, setUserInfo } = useContext(UserContext);

  // const getuser = async () => {
  //   const { data } = await axios.get("/auth/profile");
  //   if (data.success) {
  //     setUserInfo(data.user);
  //   }
  // };
  // useEffect(() => {
  //   getuser();
  // }, []);
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/register" element={<Register></Register>} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/post-edit/:id" element={<CreatePost />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
