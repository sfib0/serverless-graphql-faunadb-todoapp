import { FormEventHandler } from "react";

import * as styles from '../css/style.module.css'

interface TodoFormProps {
  title: string;
  setTitle: Function;
  formClassName: string;
  onSubmit: FormEventHandler<HTMLFormElement>
}

const TodoForm: React.FC<TodoFormProps> = ({ title, setTitle, onSubmit, formClassName }) => {

  return (
    <form onSubmit={onSubmit} className={styles[formClassName]}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button>✔️</button>
    </form>
  )
}

export default TodoForm;