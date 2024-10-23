const zod = require("zod");



const createTodo = zod.object({
    title:zod.string(),
    description:zod.string()
})


const updateTodo = zod.object({
    id: zod.string().length(24), // Assuming you're using MongoDB ObjectId
    completed: zod.enum(['true', 'false']) // or you could use boolean directly
});


module.exports = {
    createTodo:createTodo,
    updatedTodo:updateTodo
}