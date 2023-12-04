import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Edit() {
  const [form, setForm] = useState({
    title: "goas",
    password: "",
    username: "",
    website_url: "",
    usernameIsEmail: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    
    async function fetchData() {
      console.log("effect triggering")
      const id = params.id.toString();
      const response = await fetch(
        `http://localhost:5000/record/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      
      const record = response.json();
      if (!record) {
        window.alert(`Record with ${id} not found`);
        navigate("/");
        return;
      }
      
      setForm(record);
    }
    fetchData();
    
    return;
  }, [params.id, navigate]);

  // update the state properties
  function updateForm(value) {
    return setForm((prev) => {
      console.log("setform called")
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedNote = {
      title: form.title,
      password: form.password,
      username: form.username,
      website_url: form.website_url,
      usernameIsEmail: form.usernameIsEmail,
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/record/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify(editedNote),
      headers: {
        "Content-Type": "application/jason",
      },
    });
    navigate("/");
  }

  return (
    <div>
      <h3>Update Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={form.title}
            onChange={(e) => updateForm({ name: e.target.value })}
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
          <label htmlFor="password">Password</label>
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
              //checked={form.usernameIsEmail === true}
              onChange={(e) => updateForm({ usernameIsEmail: e.target.value })}
            />
            <label htmlFor="usernameIsEmail" className="form-check-label">
              Username is same as email id.
            </label>
          </div>
        </div>
        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Update Record"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
