import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';

const app = express();
const port = 8080;

// Define the schema
const todoSchema = new mongoose.Schema({
    UserName: String,
    Email: String,
    Phone: String,
    Suggestion: String
});

// Create the model
const Todo = mongoose.model('Todo', todoSchema);

// Middleware to parse JSON
app.use(express.json());
app.use(cors()); // Allow cross-origin requests

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todo')
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Todo API!');
});

// API to add a new user
app.post('/addUser', async (req, res) => {
    const { UserName, Email, Phone, Suggestion } = req.body;

    const newUser = new Todo({
        UserName,
        Email,
        Phone,
        Suggestion
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: "Error saving user data" });
    }
});

// Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await Todo.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
});

// Delete a user
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Todo.findByIdAndDelete(id);
        res.status(204).send(); // No content status
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
});

// Update a user
app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await Todo.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Error updating user' });
    }
});

app.listen(port, () => {
    console.log(`App Launched At http://localhost:${port}`);
});
