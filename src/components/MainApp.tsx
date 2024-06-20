import Header from "@/components/Header";
import TodoList from "@/components/TodoList/TodoList";
import {useContext} from "react";
import {themeContext} from "@/context/ThemeProvider";
import useTodo from "@/hooks/use-todo";
import {Toaster} from "react-hot-toast";
import {Todo} from "@/types/types";
interface MainAppProps {
    todos: Todo[]
}
const MainApp = ({todos}:MainAppProps) => {
    const {isDarkTheme} = useContext(themeContext);
    const {todoItems, addTodo, deleteTodo, setStatus, clearCompletedTodos} = useTodo(todos);
  return (
      <main className={isDarkTheme ? 'dark' : ''}>
          <Header addTodoHandler={addTodo}/>
          <TodoList todos={todoItems} deleteTodoFn={deleteTodo} changeStatusFn={setStatus} clearCompletedHandler={clearCompletedTodos}/>
          <Toaster/>
      </main>

  )
}
export default MainApp;