import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [form, setForm] = useState({
    title: "",
    password: "",
    username: "",
    website_url: "",
  });

  const navigate = useNavigate();

  // update state properties
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // Once post reqest is sent to create url, we will add new record to database
    const newNote = { ...form };

    await fetch("http://localhost:5000/record/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({
      title: "",
      password: "",
      username: "",
      website_url: "",
      usernameIsEmail: "",
    });
    navigate("/");
  }

  return (
    <div>
      <h3>Create New Note</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={form.title}
            onChange={(e) => updateForm({ title: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="website_url">Website Url</label>
          <input
            type="text"
            className="form-control"
            id="website_url"
            value={form.website_url}
            onChange={(e) => updateForm({ website_url: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={form.username}
            onChange={(e) => updateForm({ username: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Pasword</label>
          <input
            type="text"
            className="form-control"
            id="password"
            value={form.password}
            onChange={(e) => updateForm({ password: e.target.value })}
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              name="username_is_email"
              id="usernameIsEmail"
              value={false}
              checked={form.usernameIsEmail === true}
              onChange={(e) => updateForm({ usernameIsEmail: e.target.value })}
            />
            <label htmlFor="usernameIsEmail" className="form-check-label">
              Username is same as email id.
            </label>
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Note"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
