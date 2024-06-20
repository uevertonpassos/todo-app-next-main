import TodoItem from "@/components/TodoList/TodoItem";
import classes from "@/sass/components/todo_list.module.scss"
import ActionBox from "@/components/ActionBox";
import {useContext, useEffect, useState} from "react";
import {themeContext} from "@/context/ThemeProvider";
import {DragEndResult, SortType, Todo} from "@/types/types";
import {DragDropContext, Droppable} from 'react-beautiful-dnd'

interface TodolistProps {
    todos: Todo[],
    deleteTodoFn: (id: string) => void,
    changeStatusFn: (todoData: Todo) => void,
    clearCompletedHandler: () => void,

}

const TodoList = ({todos, deleteTodoFn, changeStatusFn, clearCompletedHandler}:TodolistProps) => {
    const {isDarkTheme} = useContext(themeContext);
    const [todoItems, setTodoItems] = useState<Todo[]>(todos);
    const [sortType, setSortType] = useState<SortType>('all');
    const listClass = isDarkTheme ? `${classes.todolist__list} ${classes['todolist__list--dark']}`: classes.todolist__list;
    const summaryClass = isDarkTheme ? `${classes.todolist__summary} ${classes['todolist__summary--dark']}` : classes.todolist__summary
    const summaryTextClass =  isDarkTheme ? ` ${classes.todolist__summary__actions__action} ${classes['todolist__summary__actions__action--dark']}` : classes.todolist__summary__actions__action;
    const clearClass = isDarkTheme ? `${classes.todolist__summary__clear} ${classes['todolist__summary__clear--dark']}` : classes.todolist__summary__clear
    const leftClass = isDarkTheme ? `${classes.todolist__summary__left} ${classes['todolist__summary__left--dark']}` : classes.todolist__summary__left
    const fallbackClass = isDarkTheme ? `${classes.todolist__list__fallback} ${classes['todolist__list__fallback--dark']}` : classes.todolist__list__fallback
    const summaryTextClassActive = `${summaryTextClass} ${classes['todolist__summary__actions__action--active']}`;


    const changeSortTypeHandler = (e:any) => {
        setSortType(e.target.id);
    }
    useEffect(() => {
        let filteredTodos = todos;
        if(sortType === 'active' || sortType ==='completed'){
            filteredTodos = todos.filter(todo => todo.status === sortType);
            setTodoItems(filteredTodos);
        }
        else{
            filteredTodos = todos.filter(todo => todo.status !== 'all')
        }
        setTodoItems(filteredTodos)
    }, [sortType, todos])
    
    const onDragEnd = (result: DragEndResult) => {
        const {draggableId, source, destination} = result;

        //if we don't have a destination object (e.g. item was out of dragging context bounds), then do nothing
        if (!destination){
            return;
        }
        //if the item has the same destination index (meaning we haven't moved the item into new position) then do nothing
        if(destination.droppableId === source.droppableId && destination.index === source.index){
            return;
        }
        let updatedOrder = todos;
        const draggedTodo = todos.find(todo => todo.id === draggableId);
        if(draggedTodo){
            //delete one item from arr (if delete count = 1 then delete the starting index item)
            updatedOrder.splice(source.index, 1);
            //at the destination index, don't delete anything, however insert the item at that index
            updatedOrder.splice(destination.index, 0, draggedTodo);
        }
        console.log(updatedOrder);
        setTodoItems(updatedOrder);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
      <div className={classes.todolist}>
          <Droppable droppableId={'todoDrag'}>
              {(provided,snapshot) => (
                  <ul className={listClass} ref={provided.innerRef} {...provided.droppableProps}>
                      {todoItems.map((todoItem, index) => <TodoItem key={todoItem.id} index={index} id={todoItem.id} status={todoItem.status} todoName={todoItem.name} deleteTodoFn={deleteTodoFn} changeStatusFn={changeStatusFn}/>)}
                      {todoItems.length === 0 && <li className={fallbackClass}>No todos in the {sortType} category :(</li>}
                      {provided.placeholder}
                  </ul>
              ) }
          </Droppable>
          <div className={summaryClass}>
              <span className={leftClass}>{todos.length} items left</span>
              <div className={classes.todolist__summary__actions}>
                  <button id={'all'} className={sortType !== "all" ? summaryTextClass : summaryTextClassActive} onClick={changeSortTypeHandler}>All</button>
                  <button id={'active'} className={sortType !== "active" ? summaryTextClass : summaryTextClassActive} onClick={changeSortTypeHandler}>Active</button>
                  <button id={'completed'} className={sortType !== "completed" ? summaryTextClass : summaryTextClassActive} onClick={changeSortTypeHandler}>Completed</button>
              </div>
              <span onClick={clearCompletedHandler} className={clearClass}>Clear completed</span>
          </div>
          <ActionBox sortType={sortType} setSortType={changeSortTypeHandler}/>
          <p className={classes.todolist__info}>Drag and drop to reorder list</p>
      </div>
        </DragDropContext>
  )
}

export default TodoList;