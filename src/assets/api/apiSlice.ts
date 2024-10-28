import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const todosApi = createApi({
    reducerPath:'todosApi',
    baseQuery:fetchBaseQuery({baseUrl:'https://dummyjson.com'}),
    endpoints:(builder)=>({
        fetchTodos:builder.query({
            query:()=>'todos'
        }),

        //add todo list item
        addTodo: builder.mutation({
            query: (newTodo) => ({
              url: 'todos',
              method: 'POST',
              body: newTodo,
            }),
          }),

        // update todo item
        updateTodo:builder.mutation({
            query:({id, ...rest})=>({
                url:`todos/${id}`,
                method:'PUT',
                body:rest,
            })
        }),
        //delete todo item
        deleteTodo:builder.mutation({
            query:(id)=>({
                url:`todos/${id}`,
                method:'DELETE',
            }),
        }),
    }),
})

export const {useFetchTodosQuery,useAddTodoMutation,useDeleteTodoMutation,useUpdateTodoMutation} = todosApi