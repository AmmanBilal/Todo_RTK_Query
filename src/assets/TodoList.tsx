import {useState} from 'react'
import {useFetchTodosQuery,useUpdateTodoMutation,useAddTodoMutation,useDeleteTodoMutation} from '../assets/api/apiSlice'

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}
const TodoList = () => {
    const {data: todos=[],error,isLoading}= useFetchTodosQuery([])
    const [addTodo] = useAddTodoMutation()
    const [updateTodo] = useUpdateTodoMutation()
    const [deleteTodo] = useDeleteTodoMutation()

    const [newTitle,setNewTitle] = useState('')

    const handleAddTodo= async()=>{
        await addTodo({
            title:newTitle,
            completed:false,
        })
        setNewTitle('')
    }


  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading todos</div>

  return (
   <>
    <h1>To-do List</h1>
    <input 
    type='text'
    value={newTitle}
    onChange={(e)=>setNewTitle(e.target.value)}
    placeholder='"new to-do'/>

        <button onClick={handleAddTodo}>Add</button>
        <ul>
             {todos.map((todo:Todo) => (
                <li key={todo.id}>
                    {todo.title}
                    <button onClick={() => updateTodo({ id: todo.id, completed: !todo.completed })}>
                    {todo.completed ? 'Unmark' : 'Complete'}
                    </button>
                    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </li>
                ))}

        </ul>
   </>
  )
}

export default TodoList