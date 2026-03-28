import React, { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const [editId, setEditId] = useState(null);

  // FETCH USERS
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ADD / UPDATE USER
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId !== null) {
        await fetch(`http://localhost:5000/users/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });
        setEditId(null);
      } else {
        await fetch("http://localhost:5000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });
      }

      setForm({ name: "", email: "", age: "" });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  // DELETE USER
  const deleteUser = async (id) => {
    try {
      await fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE"
      });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  // EDIT USER
  const editUser = (user) => {
    setForm({
      name: user.name,
      email: user.email,
      age: user.age
    });
    setEditId(user.id);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>User CRUD App</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
        />
        <button type="submit">
          {editId !== null ? "Update" : "Add"}
        </button>
      </form>

      <hr />

      {/* TABLE */}
      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <button onClick={() => editUser(user)}>Edit</button>
                  <button onClick={() => deleteUser(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No Data Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;