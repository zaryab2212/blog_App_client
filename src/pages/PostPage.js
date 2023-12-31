import axios from "axios";
import { formatISO9075 } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";

const PostPage = () => {
  const { userInfo } = useContext(UserContext);

  const [post, setpost] = useState();
  const params = useParams();
  const { id } = params;
  const getPost = async () => {
    const { data } = await axios.get("/post/single-post/" + id);
    if (data.success) {
      setpost(data);
    }
  };
  useEffect(() => {
    getPost();
  }, []);
  return (
    <>
      {post && (
        <div className="container mt-4">
          <h5 className="text-center m-2 h2">{post?.post?.title}</h5>
          <div className="align-center   text-center">
            <p className="align-center  text-center">
              @{<b>{post?.post?.author.name}</b>}{" "}
              <p>
                {" "}
                <p className="card-text ">
                  <small className="text-body-secondary">
                    {formatISO9075(new Date(post?.post?.createdAt))}
                  </small>
                </p>
              </p>{" "}
            </p>
            <Link to={`/post-edit/${id}`}>
              {" "}
              {userInfo?._id == post?.post?.author._id && (
                <button className="btn btn-primary"> Edit Post</button>
              )}
            </Link>
          </div>
          {/* <p
            className="card-text text-start
          "
          >
            {post?.post?.summary}
          </p>{" "} */}
          <div className="">
            <img
              src={`http://localhost:8080/${post?.post?.file}`}
              className=" w-100 cover mt-2 image"
              alt={post?.post?.author.name}
            />
          </div>
          <div
            className="card-text mt-4 text-start
          "
            dangerouslySetInnerHTML={{ __html: post?.post?.content }}
          ></div>{" "}
        </div>
      )}
    </>
  );
};

export default PostPage;
