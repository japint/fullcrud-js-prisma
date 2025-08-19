import React, { useEffect, useState } from "react";
import "./App.css"; // keep your styles in App.css (copy the <style> part there)

const API_BASE = "/api";

function App() {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [userForm, setUserForm] = useState({
    id: null,
    name: "",
    email: "",
    age: "",
  });
  const [postForm, setPostForm] = useState({
    id: null,
    title: "",
    content: "",
    authorId: "",
    published: false,
  });
  const [message, setMessage] = useState(null);

  // --- API Helper ---
  async function apiCall(endpoint, options = {}) {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    if (!response.ok)
      throw new Error((await response.json()).error || "Something went wrong");
    return response.json();
  }

  // --- Loaders ---
  async function loadUsers() {
    try {
      const data = await apiCall("/users");
      setUsers(data);
    } catch (err) {
      showMessage(`Error loading users: ${err.message}`, "error");
    }
  }

  async function loadPosts() {
    try {
      const data = await apiCall("/posts");
      setPosts(data);
    } catch (err) {
      showMessage(`Error loading posts: ${err.message}`, "error");
    }
  }

  // --- User CRUD ---
  async function handleUserSubmit(e) {
    e.preventDefault();
    const userData = {
      name: userForm.name.trim(),
      email: userForm.email.trim(),
      age: userForm.age ? parseInt(userForm.age) : null,
    };
    try {
      await apiCall(userForm.id ? `/users/${userForm.id}` : "/users", {
        method: userForm.id ? "PUT" : "POST",
        body: JSON.stringify(userData),
      });
      resetUserForm();
      loadUsers();
      showMessage("User saved successfully!", "success");
    } catch (err) {
      showMessage(`Error saving user: ${err.message}`, "error");
    }
  }

  function editUser(user) {
    setUserForm(user);
  }

  async function deleteUser(id) {
    if (!window.confirm("Delete this user? All posts will also be deleted."))
      return;
    await apiCall(`/users/${id}`, { method: "DELETE" });
    loadUsers();
    showMessage("User deleted successfully!", "success");
  }

  function resetUserForm() {
    setUserForm({ id: null, name: "", email: "", age: "" });
  }

  // --- Post CRUD ---
  async function handlePostSubmit(e) {
    e.preventDefault();
    const postData = {
      title: postForm.title.trim(),
      content: postForm.content.trim() || null,
      authorId: parseInt(postForm.authorId),
      published: postForm.published,
    };
    try {
      await apiCall(postForm.id ? `/posts/${postForm.id}` : "/posts", {
        method: postForm.id ? "PUT" : "POST",
        body: JSON.stringify(postData),
      });
      resetPostForm();
      loadPosts();
      showMessage("Post saved successfully!", "success");
    } catch (err) {
      showMessage(`Error saving post: ${err.message}`, "error");
    }
  }

  function editPost(post) {
    setPostForm({
      id: post.id,
      title: post.title,
      content: post.content || "",
      authorId: post.authorId,
      published: post.published,
    });
  }

  async function deletePost(id) {
    if (!window.confirm("Delete this post?")) return;
    await apiCall(`/posts/${id}`, { method: "DELETE" });
    loadPosts();
    showMessage("Post deleted successfully!", "success");
  }

  function resetPostForm() {
    setPostForm({
      id: null,
      title: "",
      content: "",
      authorId: "",
      published: false,
    });
  }

  // --- Utility ---
  function showMessage(msg, type) {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(null), 4000);
  }

  // --- Effects ---
  useEffect(() => {
    if (activeTab === "users") loadUsers();
    if (activeTab === "posts") {
      loadPosts();
      loadUsers();
    }
  }, [activeTab]);

  return (
    <div className="container">
      <h1>Prisma CRUD Application</h1>

      {message && <div className={message.type}>{message.text}</div>}

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === "users" ? "active" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
        <button
          className={`tab ${activeTab === "posts" ? "active" : ""}`}
          onClick={() => setActiveTab("posts")}
        >
          Posts
        </button>
      </div>

      {/* Users Tab */}
      {activeTab === "users" && (
        <div className="tab-content active">
          <div className="form-section">
            <h2>{userForm.id ? "Edit User" : "Add New User"}</h2>
            <form onSubmit={handleUserSubmit}>
              <div className="form-group">
                <label>Name *</label>
                <input
                  value={userForm.name}
                  onChange={(e) =>
                    setUserForm({ ...userForm, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={userForm.email}
                  onChange={(e) =>
                    setUserForm({ ...userForm, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  value={userForm.age}
                  onChange={(e) =>
                    setUserForm({ ...userForm, age: e.target.value })
                  }
                />
              </div>
              <button type="submit">
                {userForm.id ? "Update User" : "Add User"}
              </button>
              <button
                type="button"
                className="secondary"
                onClick={resetUserForm}
              >
                Reset
              </button>
            </form>
          </div>

          <div className="items-grid">
            {users.length === 0 ? (
              <div className="loading">No users found. Add some users!</div>
            ) : (
              users.map((u) => (
                <div key={u.id} className="item-card">
                  <div className="item-header">
                    <div>
                      <div className="item-title">{u.name}</div>
                      <div className="item-meta">
                        {u.email} {u.age && `• Age: ${u.age}`}
                      </div>
                      <div className="item-meta">
                        Posts: {u.posts.length} • Created:{" "}
                        {new Date(u.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="item-actions">
                    <button onClick={() => editUser(u)}>Edit</button>
                    <button onClick={() => deleteUser(u.id)} className="danger">
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Posts Tab */}
      {activeTab === "posts" && (
        <div className="tab-content active">
          <div className="form-section">
            <h2>{postForm.id ? "Edit Post" : "Add New Post"}</h2>
            <form onSubmit={handlePostSubmit}>
              <div className="form-group">
                <label>Title *</label>
                <input
                  value={postForm.title}
                  onChange={(e) =>
                    setPostForm({ ...postForm, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Content</label>
                <textarea
                  rows="4"
                  value={postForm.content}
                  onChange={(e) =>
                    setPostForm({ ...postForm, content: e.target.value })
                  }
                ></textarea>
              </div>
              <div className="form-group">
                <label>Author *</label>
                <select
                  value={postForm.authorId}
                  onChange={(e) =>
                    setPostForm({ ...postForm, authorId: e.target.value })
                  }
                  required
                >
                  <option value="">Select an author</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={postForm.published}
                    onChange={(e) =>
                      setPostForm({ ...postForm, published: e.target.checked })
                    }
                  />
                  Published
                </label>
              </div>
              <button type="submit">
                {postForm.id ? "Update Post" : "Add Post"}
              </button>
              <button
                type="button"
                className="secondary"
                onClick={resetPostForm}
              >
                Reset
              </button>
            </form>
          </div>

          <div className="items-grid">
            {posts.length === 0 ? (
              <div className="loading">No posts found. Add some posts!</div>
            ) : (
              posts.map((p) => (
                <div key={p.id} className="item-card">
                  <div className="item-header">
                    <div>
                      <div className="item-title">{p.title}</div>
                      <div className="item-meta">
                        By {p.author.name} •{" "}
                        {new Date(p.createdAt).toLocaleDateString()}
                        <span
                          className={`status-badge ${
                            p.published ? "published" : "draft"
                          }`}
                        >
                          {p.published ? "Published" : "Draft"}
                        </span>
                      </div>
                    </div>
                  </div>
                  {p.content && <div className="item-content">{p.content}</div>}
                  <div className="item-actions">
                    <button onClick={() => editPost(p)}>Edit</button>
                    <button onClick={() => deletePost(p.id)} className="danger">
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
