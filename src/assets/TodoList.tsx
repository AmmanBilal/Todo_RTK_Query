import {useState,useEffect} from 'react'
import {useFetchTodosQuery,useUpdateTodoMutation,useAddTodoMutation,useDeleteTodoMutation} from '../assets/api/apiSlice'

interface Todo {
    id: number;
    todo: string;
    completed: boolean;
    userId:number;
}
const TodoList = () => {
    const {data: todosData={todos:[]},error,isLoading,refetch}= useFetchTodosQuery(undefined)
    
    const [addTodo,{data:newData}] = useAddTodoMutation()
    const [updateTodo] = useUpdateTodoMutation()
    const [deleteTodo] = useDeleteTodoMutation()

    const [newTodo,setNewTodo] = useState('')
    useEffect(()=>{
            if(newData){
                console.log(newData)
                refetch()
            }
    },[newData])
    const handleAddTodo= ()=>{
        addTodo({
            title:newTodo,
            completed:false,
            userId:1
        })
        console.log("add todo")
        setNewTodo('')
        
    }
    const handleUpdateTodo=(todo:Todo)=>{
        updateTodo({
            id:todo.id,
            todo:todo.todo,
            completed:!todo.completed,
            userId:todo.userId
        })
        console.log("update todo")
    }

    const handleDeleteTodo=(id:number)=>{
        deleteTodo(id)
        console.log("del todo")
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
    placeholder='new to-do'/>

        <button onClick={handleAddTodo}>Add</button>
        <ul>
             {todosData.todos.map((todo:Todo) => (
                <li key={todo.id}>
                    {todo.todo}
                    <button onClick={() => handleUpdateTodo(todo)}>
                    {todo.completed ? 'inComplete' : 'Complete'}
                    </button>
                    <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                </li>
                ))}

        </ul>
   </>
  )
}

export default TodoList