const express = require("express");
const router = express.Router();

const db = require("../db");

// Register new student
router.post("/", (req, res) => {
    const {
        name,
        email,
        mobile_number,
        course,
        gender
    } = req.body;

    if (
        !name?.trim() ||
        !email?.trim() ||
        !mobile_number?.trim() ||
        !course?.trim() ||
        !gender?.trim()
    ) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const sql = `
        INSERT INTO form
        (name, email, mobile_number, course, gender)
        VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
        name.trim(),
        email.trim(),
        mobile_number.trim(),
        course.trim(),
        gender.trim()
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(409).json({
                    message: "This email is already registered"
                });
            }

            console.error("Registration error:", err.message);

            return res.status(500).json({
                message: "Failed to register student"
            });
        }

        res.status(201).json({
            message: "Student registered successfully",
            studentId: result.insertId
        });
    });
});


// Get all students
router.get("/", (req, res) => {
    const sql = "SELECT * FROM form ORDER BY id ASC";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Fetch students error:", err.message);

            return res.status(500).json({
                message: "Failed to fetch students"
            });
        }

        res.status(200).json(results);
    });
});

module.exports = router;