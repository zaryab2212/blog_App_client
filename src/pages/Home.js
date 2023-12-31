import React, { useContext, useEffect, useState } from "react";
import Post from "../components/Post";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Home = () => {
  const [allPost, setallPost] = useState([]);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const fetchPost = async () => {
    const { data } = await axios.get("/post");

    if (data.success) {
      setallPost(data.posts);
    }
  };

  useEffect(() => {
    if (userInfo) {
      fetchPost();
    }
  }, []);

  return (
    <>
      {!userInfo && <Navigate to="/login" />}

      <div className="container">
        {allPost && allPost.length > 0 && allPost.map((p) => <Post {...p} />)}
      </div>
    </>
  );
};

export default Home;
