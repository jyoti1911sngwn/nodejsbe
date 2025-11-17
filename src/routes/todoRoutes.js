import express from 'express'
import prisma from '../prismaClient.js'

const router  = express.Router()

//getall todos from logged in users
router.get('/', async(req, res)=>{
    const todos = await prisma.todo.findMany({
        where: {
            userId : req.userId
        }
    })
    res.json(todos)
})

// create a new todo 
router.post('/', async(req, res)=>{
const {task} =req.body;
const todo = await prisma.todo.create({
    data: {
        task, 
        userId: req.userId
    }
})

res.json(todo)
})

// update a todo 
router.put('/:id', async(req, res)=>{
    const {completed} = req.body
    const {id} = req.params
    const updatedTodo = await prisma.update({
        where : {
            id: parseInt(id),
            userId: req.userId
        },
        data:{
            completed: !!completed
        }
    })
    res.json(updatedTodo)

})

//delete a todo 
router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    try {
       await prisma.todo.delete({
            where:{
                id: parseInt(id),
                userId
            }
        })

        if (result.changes === 0) {
            return res.status(404).json({ message: "Todo not found or not yours" });
        }

        return res.status(200).json({ message: "Todo deleted successfully" });

    } catch (error) {
        console.error("Delete error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


export default router;