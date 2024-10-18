const Task = require("../models/student");

const getCourses = async (req, res) => {
    try {
        const student = await Task.find({});
        res.status(200).send({ task });
    } catch (error) {
        res.status(400).send(error);
    }
}

const setCourses = async (req, res) => {
    try {
        const tasks = await Task.create();
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500)
    }
}

const getTask = async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id);
        if (!task) {
            return res.status(404).send();
        } else {
            res.status(200).send(task);
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {getCourses, setCourses, updateCourses, removeCourses}