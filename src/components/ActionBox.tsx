import classes from "@/sass/components/todo_list.module.scss"
import {SyntheticEvent, useContext} from "react";
import {themeContext} from "@/context/ThemeProvider";
import {SortType} from "@/types/types";

interface ActionBoxProps {
    sortType: SortType
    setSortType: (sortType: SortType) => void
}
const ActionBox = ({sortType, setSortType}:ActionBoxProps) => {
    const {isDarkTheme} = useContext(themeContext);
    const actionBoxClass = isDarkTheme ? `${classes['todolist__action-box']} ${classes['todolist__action-box--dark']}` : classes['todolist__action-box'];
    const actionClass = isDarkTheme ? `${classes['todolist__action-box__action']} ${classes['todolist__action-box__action--dark']}` : classes['todolist__action-box__action'];
    const actionClassActive = `${actionClass} ${classes['todolist__action-box__action--active']}`
    const changeSortTypeHandler = (e:any) => {
        setSortType(e)
    }
  return (
      <div className={actionBoxClass}>
          <button id={'all'} onClick={changeSortTypeHandler} className={sortType !== "all" ? actionClass : actionClassActive}>All</button>
          <button id={'active'} onClick={changeSortTypeHandler} className={sortType !== "active" ? actionClass : actionClassActive}>Active</button>
          <button id={'completed'} onClick={changeSortTypeHandler} className={sortType !== "completed" ? actionClass : actionClassActive}>Completed</button>
      </div>
  )
}
export default ActionBox;