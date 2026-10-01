const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Book = require("./models/Book");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/libraryDB")
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

app.post("/api/books", async (req, res) => {
    try {
        const {
            title,
            author,
            isbn,
            category,
            publicationYear
        } = req.body;

        if (!title || !author || !isbn || !category || !publicationYear) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const book = new Book({
            title,
            author,
            isbn,
            category,
            publicationYear
        });

        const savedBook = await book.save();

        res.status(201).json(savedBook);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});