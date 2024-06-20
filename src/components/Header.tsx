import classes from "@/sass/pages/todo_page.module.scss";
import ThemeSwitch from "@/components/ThemeSwitch";
import AddTodoForm from "@/components/AddTodoForm";
import {useContext} from "react";
import {themeContext} from "@/context/ThemeProvider";
import {TodoPostData} from "@/types/types";

interface HeaderProps {
    addTodoHandler: (todoData:TodoPostData) => void
}
const Header = ({addTodoHandler}:HeaderProps) => {
    const {isDarkTheme} = useContext(themeContext);
    const headerClass = isDarkTheme ? `${classes.header} ${classes['header--dark']}` : classes.header;

  return(
      <header className={headerClass}>
          <div className={classes.header__head}>
              <h1 className={classes.header__head__heading}>todo</h1>
              <ThemeSwitch/>
          </div>
          <div className={classes['form-box']}>
            <AddTodoForm addTodoHandler={addTodoHandler}/>
          </div>
      </header>
  )
}
export default Header;