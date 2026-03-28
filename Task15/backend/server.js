const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/users", (req, res) => {
    const { name, email, age } = req.body;
    db.query(
        "INSERT INTO users (name, email, age) VALUES (?, ?, ?)",
        [name, email, age],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.send(result);
        }
    );
});

app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

app.put("/users/:id", (req, res) => {
    const { name, email, age } = req.body;
    db.query(
        "UPDATE users SET name=?, email=?, age=? WHERE id=?",
        [name, email, age, req.params.id],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.send(result);
        }
    );
});

app.delete("/users/:id", (req, res) => {
    db.query(
        "DELETE FROM users WHERE id=?",
        [req.params.id],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.send({ message: "Deleted" });
        }
    );
});

app.listen(5000, () => console.log("Server running on port 5000"));