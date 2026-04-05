const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Student = require('./models/Student');

const app = express();
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/placementDB')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// 👉 Add Student
app.post('/students', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.send("Student Added");
    } catch (err) {
        res.send(err);
    }
});

// 👉 Get All Students
app.get('/students', async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

// 👉 Get Placed Students
app.get('/placed', async (req, res) => {
    const students = await Student.find({ placed: true });
    res.json(students);
});

// 👉 Update Placement Status
app.put('/students/:id', async (req, res) => {
    await Student.findByIdAndUpdate(req.params.id, req.body);
    res.send("Updated");
});

// 👉 Delete Student
app.delete('/students/:id', async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.send("Deleted");
});


// Server Start
app.listen(3000, () => {
    console.log("Server running on port 3000");
});