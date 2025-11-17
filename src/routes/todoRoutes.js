import express from 'express'
import db from '../db.js'

const router  = express.Router()

//getall todos from logged in users
router.get('/', (req, res)=>{
    const getTodo = db.prepare(`SELECT * FROM todos WHERE user_id = ?`)
    const todos = getTodo.all(req.userId)
    res.json(todos)
})

// create a new todo 
router.post('/', (req, res)=>{
const {task} =req.body;
const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`)
const result = insertTodo.run(req.userId, task)
res.json({id : result.lastInsertRowid, task , completed: 0})
})

// update a todo 
router.put('/:id', (req, res)=>{
    const {completed} = req.body
    const {id} = req.params
    const updateTodo = db.prepare(`UPDATE todos SET completed =? WHERE id= ?`)
    updateTodo.run(completed, id)
    res.json({message : 'Todo Completed'})

})

//delete a todo 
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    try {
        const deleteTodo = db.prepare(`DELETE FROM todos WHERE id = ? AND user_id = ?`);
        const result = deleteTodo.run(id, userId);

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