const express = require("express");
const mongoose = require("mongoose");

const app = express();

// MongoDB Connection
mongoose.connect("YOUR_MONGODB_CONNECTION_STRING")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home Route
app.get("/", (req, res) => {
    res.send("Portfolio API is running!");
});

// Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

// Model
const Contact = mongoose.model("Contact", contactSchema);

// Contact Route
app.post("/contact", async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();

        console.log("Saved:", req.body);
        res.send("Data saved successfully!");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error saving data");
    }
});

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});