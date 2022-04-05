const asyncHandler = require('express-async-handler')
const Task = require('../models/task')
const User = require('../models/user')
//@desc     Get tasks
//@route    GET /api/tasks
//@access   private
const getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({user:req.user.id})
    res.json(tasks)
})
//@desc     Set task
//@route    POST /api/tasks
//@access   private
const setTask = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        throw new Error("please add a text field")
    }
    const task = await Task.create({
        name: req.body.name,
        deadline: req.body.deadline,
        desc: req.body.desc,
        user:req.user.id
    })
    res.status(200).json(task)
})
//@desc     Update task
//@route    PUT /api/tasks/:id
//@access   private
const updateTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id)
    if (!task) {
        res.status(400)
        throw new Error("Task not found")
    }
    const user = await User.findById(req.user.id)
    //Check for user
    if(!user){
        res.status(401)
        throw new Error("User not found")
    }
    //Check if user matches the task user
    if(task.user.toString() !== user.id){
        res.status(401)
        throw new Error("User not authorized")
    }
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.json(updatedTask)
})
//@desc     Delete task
//@route    DELETE /api/tasks/:id
//@access   private
const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id)
    if (!task) {
        res.status(400)
        throw new Error("Task not found")
    }
    const user = await User.findById(req.user.id)
    //Check for user
    if(!user){
        res.status(401)
        throw new Error("User not found")
    }
    //Check if user matches the task user
    if(task.user.toString() !== user.id){
        res.status(401)
        throw new Error("User not authorized")
    }
    task.remove()
    res.json({id:req.params.id})
})

module.exports = {
    getTasks,
    setTask,
    updateTask,
    deleteTask

}