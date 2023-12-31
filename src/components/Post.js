import { formatISO9075 } from "date-fns";
import { id } from "date-fns/locale";
import React from "react";
import { Link } from "react-router-dom";

const Post = ({
  author,
  content,
  createdAt,
  summary,
  title,
  updatedAt,
  _id,
  file,
}) => {
  return (
    <>
      <div className="card w-100 mb-3">
        <div className="row g-0 d-flex flex">
          <div className="col-md-4">
            <Link to={`/post/${_id}`}>
              <img src={file} className="img-fluid rounded-start" alt="..." />
            </Link>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <Link to={`/post/${_id}`}>
                {" "}
                <h5 className="card-title h2">{title}</h5>
              </Link>
              <p className="card-text">
                @{<b>{author.name}</b>}{" "}
                <span>
                  {" "}
                  <p className="card-text">
                    <small className="text-body-secondary">
                      {formatISO9075(new Date(createdAt))}
                    </small>
                  </p>
                </span>{" "}
              </p>
              <p className="card-text">{summary}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
