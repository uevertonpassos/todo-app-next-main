import {Todo, TodoPostData} from "@/types/types";
import {useState} from "react";
import toast from "react-hot-toast";

const useTodo = (todos:Todo[]) => {
    const [todoItems, setTodoItems] = useState<Todo[]>(todos);
    const getUpdatedTodos = async () => {
        const res = await fetch('/api/todos');
        const data = await res.json();
        return data;
    }
    const addTodo = async (todoData:TodoPostData) => {
        console.log('logging')
        const tempRandID = (Math.random() * 36000).toString(16);
        const loadingToast = toast.loading("Adding todo..")
        const cacheTodo:Todo = {
            id: tempRandID,
            name: todoData.name,
            status: "active"
        }
        console.log(cacheTodo);
        const res = await fetch('/api/todos', {method: 'POST', body: JSON.stringify(todoData), headers:{'Content-Type': 'application/json'}});
        if(res.status === 201){
            toast.dismiss(loadingToast);
            setTodoItems(await getUpdatedTodos());
            toast.success("Todo added successfully")
        }

    }
    const deleteTodo = async (id: string) => {
        const loadingToast = toast.loading("Removing todo..")
        const res = await fetch(`/api/todos/${id}`, {method: 'DELETE', headers:{'Content-Type': 'application/json'}});
        if(res.status === 200){
            toast.dismiss(loadingToast);
            setTodoItems(await getUpdatedTodos())
            toast.success("Todo removed successfully")
        }

    }
    const setStatus = async (todoData:Todo) => {
      const cacheTodo:Todo = {
          id: todoData.id,
          name: todoData.name,
          status: todoData.status === "active" ? "completed" : "active"
      }
      let updatatedTodos:Todo[];
      const todoIdx = todoItems.findIndex(todoItem => todoItem.id === cacheTodo.id);
      updatatedTodos = [...todoItems];
      updatatedTodos[todoIdx] = cacheTodo;
      await fetch(`/api/todos/${cacheTodo.id}`, {method: 'PUT', body: JSON.stringify(cacheTodo), headers:{'Content-Type': 'application/json'}});
      setTodoItems(updatatedTodos);
    }
    const clearCompletedTodos = async () => {
      const loadingToast = toast.loading("Removing all completed todos...")
      const res = await fetch('/api/todos', {method: 'DELETE'});
      const data = await res.json();
        console.log(data)
      if(res.status === 200){
          toast.dismiss(loadingToast);
          if(data.deletedItems.deletedCount === 0){
              toast.error("There was no completed todos to remove")
          }
          else{
              setTodoItems(await getUpdatedTodos())
              toast.success(`Removed ${data.deletedItems.deletedCount} todos`, {duration: 2000});
          }

      }

    }
    return {todoItems, addTodo, deleteTodo, setStatus, clearCompletedTodos}
}
export default useTodo;