import { FormEvent, FormEventHandler, MouseEvent, MouseEventHandler, useState } from "react";

import { MUTATION_ADD_TODO, MUTATION_DELETE_TODO, MUTATION_UPDATE_TODO, QUERY_GET_TODOS } from "@/ops";
import { useMutation, useQuery, NetworkStatus } from "@apollo/client";

import * as styles from '../css/style.module.css'
import Indicator from "@/components/Indicator";
import TodoForm from "@/components/TodoForm";
import EmoteButton from "@/components/EmoteButton";
interface TodoI {
  id: string;
  title: string;
  completed: boolean;
}

const checkboxReturner = (completed: boolean) => {
  return completed ? "✅" : "⬜"
}

export default function Home() {

  const [inputForID, toogleInputForID] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const [title, setTitle] = useState("");

  const { loading, error, data, refetch, networkStatus } = useQuery(QUERY_GET_TODOS, {
    notifyOnNetworkStatusChange: true,
  });

  const [UpdateTodo] = useMutation(MUTATION_UPDATE_TODO);
  const [DeleteTodo] = useMutation(MUTATION_DELETE_TODO);
  const [AddTodo] = useMutation(MUTATION_ADD_TODO);

  if (loading) {
    return <Indicator message="Wait!" />
  } else if (error) {
    console.log(error)
    return <Indicator message="Error!" error={error} />
  }

  const UpdateTodoDetect = (e: any, id: string, title: string) => {
    if (e.detail === 2) {
      toogleInputForID(id)
      setNewTitle(title)
    }
  }

  const onUpdateTodo = (id: string, completed: boolean) => {
    UpdateTodo({
      variables: {
        id,
        title: newTitle,
        completed
      }
    });
    setNewTitle("");
    toogleInputForID("");
  }

  const onClickCheckbox = (id: string, title: string, completed: boolean) => {
    UpdateTodo({
      variables: {
        id, title, completed
      }
    })
  }

  const onDeleteTodo = async (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    await DeleteTodo({
      variables: { id }
    });
    refetch();
  }

  const onAddTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await AddTodo({
      variables: {
        title,
      }
    });
    refetch();
    setTitle("")
  }

  if (networkStatus === NetworkStatus.refetch) return 'Refetching!';

  return <div className={styles.container}>
    <header className={styles.header}>Todo App</header>
    <TodoForm
      formClassName="addForm"
      title={title}
      setTitle={setTitle}
      onSubmit={onAddTodo}
    />
    <ul className={styles.todoList}>
      {data.getTodos.map((item: TodoI) => (
        <li className={styles.todoItem} key={item.id}>
          {inputForID === item.id ? (
            <TodoForm
              onSubmit={() => onUpdateTodo(item.id, item.completed)}
              setTitle={setNewTitle}
              title={newTitle}
              formClassName="updateForm"
            />
          ) : <p onClick={(e) => UpdateTodoDetect(e, item.id, item.title)}>{item.title}</p>}
          <div className={styles.options}>
            <EmoteButton
              emote={checkboxReturner(item.completed)}
              onClick={() => onClickCheckbox(item.id, item.title, !item.completed)}
            />
            <EmoteButton
              emote="🗑️"
              onClick={async (e) => onDeleteTodo(e, item.id)}
            />
          </div>
        </li>
      ))}
    </ul>
  </div>;
}
