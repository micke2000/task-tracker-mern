const asyncHandler = require('express-async-handler')

//@desc     Get tasks
//@route    GET /api/tasks
//@access   private
const getTasks = asyncHandler(async (req,res)=>{
    res.json({msg:'get tasks'})
})
//@desc     Set task
//@route    POST /api/tasks
//@access   private
const setTask = asyncHandler(async (req,res)=>{
    if(!req.body.text){
        throw new Error("please add a text field")
    }
    res.status(200).json({msg:req.body})
})
//@desc     Update task
//@route    PUT /api/tasks/:id
//@access   private
const updateTask = asyncHandler(async (req,res)=>{
    res.json({msg:`update task ${req.params.id}`})
})
//@desc     Delete task
//@route    DELETE /api/tasks/:id
//@access   private
const deleteTask = asyncHandler(async (req,res)=>{
    res.json({msg:`delete task ${req.params.id}`})
})

module.exports = {
    getTasks,
    setTask,
    updateTask,
    deleteTask

}