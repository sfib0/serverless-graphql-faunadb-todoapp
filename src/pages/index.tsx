import { useState } from "react";

import { MUTATION_ADD_TODO, MUTATION_DELETE_TODO, MUTATION_UPDATE_TODO, QUERY_GET_TODOS } from "@/ops";
import { useMutation, useQuery, NetworkStatus } from "@apollo/client";

import * as styles from '../css/style.module.css'
import Indicator from "@/components/Indicator";
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

  const updateTodoFunc = (e: any, id: string, title: string) => {
    if (e.detail === 2) {
      toogleInputForID(id)
      setNewTitle(title)
    }
  }

  const displayInput = (id: string, completed: boolean) => {
    return (<form className={styles.editForm} onSubmit={() => {
      UpdateTodo({
        variables: {
          id,
          title: newTitle,
          completed
        }
      });
      setNewTitle("");
      toogleInputForID("");
    }}>
      <input value={newTitle} className={styles.input} onChange={(e) => setNewTitle(e.target.value)} />
      <p className={styles.checkmark}>✔️</p>
    </form>)
  }

  if (networkStatus === NetworkStatus.refetch) return 'Refetching!';

  return <div className={styles.container}>
    <header className={styles.header}>Todo App</header>
    {data.getTodos.map((item: TodoI) => (
      <div className={styles.singleItem} key={item.id}>
        {inputForID === item.id ? (
          displayInput(item.id, item.completed)
        ) : <p className={styles.title} onClick={(e) => updateTodoFunc(e, item.id, item.title)}>{item.title}</p>}
        <div className={styles.options}>
          <p className={styles.box} onClick={() => UpdateTodo({
            variables: {
              id: item.id,
              title: item.title,
              completed: !item.completed
            }
          })}>
            {checkboxReturner(item.completed)}
          </p>
          <p className={styles.box} onClick={async (e) => {
            e.preventDefault();
            await DeleteTodo({
              variables: {
                id: item.id
              }
            });
            refetch();
          }}>🗑️</p>
        </div>
      </div>
    ))}
    <div className={styles.singleItem}>
      <form className={styles.editForm} onSubmit={async (e) => {
        e.preventDefault()
        await AddTodo({
          variables: {
            title,
          }
        });
        refetch();
        setTitle("")
      }}>
        <input value={title} className={styles.input} onChange={(e) => setTitle(e.target.value)} />
        <p className={styles.checkmark}>✔️</p>
      </form>
    </div>
  </div>;
}
