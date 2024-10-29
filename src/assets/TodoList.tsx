import {useState,useEffect} from 'react'
import {useFetchTodosQuery,useUpdateTodoMutation,useAddTodoMutation,useDeleteTodoMutation} from '../assets/api/apiSlice'

interface Todo {
    id: number;
    todo: string;
    completed: boolean;
    userId:number;
}
const TodoList = () => {
    const {data: todosData={todos:[]},error,isLoading}= useFetchTodosQuery(undefined)
    
    const [addTodo] = useAddTodoMutation()
    const [updateTodo] = useUpdateTodoMutation()
    const [deleteTodo] = useDeleteTodoMutation()

    const [newTodo,setNewTodo] = useState('')
    const [todos,setTodos] = useState<Todo[]>(todosData.todos)
    useEffect(()=>{
            setTodos(todosData.todos)
    },[todosData])


    const handleAddTodo=async ()=>{
       const result= await addTodo({
            todo:newTodo,
            completed:false,
            userId:1
        })
        if(result.data){
            setTodos([...todos,result.data])
        }
        setNewTodo('')
    }
    const handleUpdateTodo=async(todo:Todo)=>{
        const updatedTodo={
            ...todo,
            completed:!todo.completed,
        }

        await updateTodo(updatedTodo)

        setTodos(todos.map(t=>(t.id === todo.id ? updatedTodo:t)))
    
    }

    const handleDeleteTodo=async(id:number)=>{
       await deleteTodo(id)
        
       setTodos(todos.filter(todo=>todo.id !==id))
    }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading todos</div>

  return (
   <>
    <h1>To-do List</h1>
    <input 
    type='text'
    value={newTodo}
    onChange={(e)=>setNewTodo(e.target.value)}
    placeholder='new to-do'
    />

        <button onClick={handleAddTodo}>Add</button>
        <ul>
             {todos.map((todo:Todo) => (
                <li key={todo.id}>
                    {todo.todo}
                    <button onClick={() => handleUpdateTodo(todo)}>
                    {todo.completed ? 'Incomplete' : 'Complete'}
                    </button>
                    <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                </li>
                ))}

        </ul>
   </>
  )
}

export default TodoList