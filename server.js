console.log("Server starting...");
require("dotenv").config();


const express = require("express");
const db = require("./db");
const cors = require("cors");
const path = require("path");
const { Server } = require("http");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    const sql =
        "INSERT INTO users(name, email, password) VALUES (?, ?, ?)";

    db.query(sql, [name, email, password], (err, result) => {
        if (err) {
            console.log(err);
            return res.send("Registration Failed");
        }

        res.send("User Registered Successfully");
    });
});

    

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email=? AND password=?";

    db.query(sql, [email, password], (err, result) => {
        if (err) {
            return res.send("Error");
        }

        if (result.length > 0) {
            res.send("Login successful");
        } else {
            res.send("Invalid credentials");
        }
    });
});


app.post("/book-puja", (req, res) => {

     const { name, phone, puja_type, booking_date, booking_time } = req.body;

const sql = `
INSERT INTO bookings
(name, phone, puja_type, booking_date, booking_time, status)
VALUES (?, ?, ?, ?, ?, ?)
`;

db.query(
    sql,
    [name, phone, puja_type, booking_date, booking_time, "pending"],
    (err, result) => {
        if (err) {
            console.log(err);
            return res.send("Booking Failed");
        }

        res.send("Booking Successful");
    });
});    
app.post("/update-status", (req, res) => {
    const { id, status } = req.body;

    const sql = "UPDATE bookings SET status=? WHERE id=?";

    db.query(sql, [status, id], (err) => {
        if (err) {
            console.log(err);
            return res.send("Error");
        }
        res.send("Status Updated");
    });
});
app.get("/user", (req, res) => {
    db.query("SELECT * FROM bookings", (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(result);
    });
});

app.put("/approve-booking/:id", (req, res) => {

    const bookingId = req.params.id;

    const sql =
    "UPDATE bookings SET status='Approved' WHERE id=?";

    db.query(sql, [bookingId], (err, result) => {

        if (err) {
            console.log(err);
            return res.send("Error");
        }

        res.send("Booking Approved");
    });
});
app.put("/reject-booking/:id", (req, res) => {

    const bookingId = req.params.id;

    const sql =
    "UPDATE bookings SET status='Rejected' WHERE id=?";

    db.query(sql, [bookingId], (err, result) => {

        if (err) {
            console.log(err);
            return res.send("Error");
        }

        res.send("Booking Rejected");
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server Running on Port", PORT);
});