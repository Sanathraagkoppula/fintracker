const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host:freesqldatabase.com,
    user:sql12809945,
    password: rFA5vVYdWP,
    database:sql12809945
});


db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

// API to store transaction
app.post("/add-transaction", (req, res) => {
    const { type, amount, category, description, date } = req.body;

    const sql = `INSERT INTO transactions (type, amount, category, description, date)
                 VALUES (?, ?, ?, ?, ?)`;

    db.query(sql, [type, amount, category, description, date], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Transaction added", id: result.insertId });
    });
});

// API to get all transactions
app.get("/transactions", (req, res) => {
    const sql = "SELECT * FROM transactions ORDER BY date DESC";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});


app.get("/transactions/month", (req, res) => {
    const { month, year } = req.query;

    const sql = `
        SELECT * FROM transactions
        WHERE MONTH(date) = ? AND YEAR(date) = ?
        ORDER BY date ASC
    `;

    db.query(sql, [month, year], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});


// DELETE transaction by ID
app.delete("/transaction/:id", (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM transactions WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        
        res.json({ message: "Transaction deleted successfully" });
    });
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
