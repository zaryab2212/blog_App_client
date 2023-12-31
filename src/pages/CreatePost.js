import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";

const CreatePost = () => {
  const [title, settitle] = useState("");
  const [summary, setsummary] = useState("");
  const [content, setcontent] = useState("");
  const [files, setfiles] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const modules = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  const sumbmitForm = async (e) => {
    e.preventDefault();
    const newdata = new FormData();
    newdata.set("title", title);
    newdata.set("summary", summary);
    newdata.set("content", content);
    if (files?.[0]) {
      newdata.set("file", files?.[0]);
    }
    if (id) {
      const { data } = await axios.put(`/post/post-edit/${id}`, newdata);
      if (data.success) {
        navigate("/");
      }
    } else {
      const { data } = await axios.post("/post/create", newdata);
      if (data.success) {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    async function getdata() {
      if (id) {
        const { data } = await axios.get("/post/single-post/" + id);

        if (data.success) {
          settitle(data.post.title);
          setsummary(data.post.summary);
          setcontent(data.post.content);
          setfiles(data.post.files);
        }
      }
    }
    getdata();
  }, []);
  return (
    <>
      <div className="container">
        <h1 className="m-auto my-4 text-center">
          {" "}
          {id ? "Edit the Post " : "Create Post"}
        </h1>
        <form onSubmit={sumbmitForm}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              name="title"
              value={title}
              onChange={(e) => settitle(e.target.value)}
              type="string"
              className="form-control"
              id="title"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Summary
            </label>
            <input
              name="summary"
              value={summary}
              onChange={(e) => setsummary(e.target.value)}
              type="string"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputfile1" className="form-label">
              File
            </label>
            <input
              name="files"
              // value={files}
              onChange={(e) => setfiles(e.target.files)}
              type="file"
              className="form-control"
              id="exampleInputfile1"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="textarea" className="form-label">
              Description
            </label>
            <ReactQuill
              onChange={(newValue) => setcontent(newValue)}
              value={content}
              // modules=modules
            />
          </div>

          <button
            type="submit"
            className="btn w-100 btn-primary b-white color-black"
          >
            {id ? " Edit Post" : "Create Post"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
