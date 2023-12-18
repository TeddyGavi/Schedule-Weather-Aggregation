import { useEffect, useState } from 'react';
import { Todo } from '../components/todo';
import axios from 'axios';
import NewTodoFormInput from '../components/new-todo';

interface ITodoDB {
  id: string;
  task: string;
  completed_at?: string;
  created_at: string;
  completed: boolean;
}
type Todos = ITodoDB[];

export default function TodosPage() {
  const [todoList, setTodoList] = useState<Todos>([]);
  console.log(`${import.meta.env.VITE_BE_BASE_URL}/todos/not`);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BE_BASE_URL}/todos/not`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setTodoList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClickeComplete = (id: string) => {
    console.log(id);
    const updateTodos = todoList.map((todo) =>
      todo.id === id
        ? { ...todo, completed_at: new Date().toISOString(), completed: true }
        : todo,
    );
    setTodoList(updateTodos);
    axios
      .patch(
        `${import.meta.env.VITE_BE_BASE_URL}/todos/update/${id}`,
        {
          completed_at: new Date(Date.now()),
          completed: true,
        },
        { withCredentials: true },
      )
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <div className="bg-white bg-opacity-90 gap-12 h-[90vh] p-3 w-10/12 md:w-6/12 flex flex-col rounded-lg ">
      <div>
        <p className="text-center md:text-3xl drop-shadow-lg text-lg ">
          Not your Todos?
        </p>
      </div>
      <div>
        <NewTodoFormInput />
      </div>
      <div className=" rounded-lg p-4 scroll-mx-2 overflow-auto ">
        {todoList.map(({ id, completed, task, completed_at, created_at }) => (
          <Todo
            key={id}
            title={task}
            status={completed ? 'Done' : 'Todo'}
            completed={completed}
            handleClickComplete={handleClickeComplete}
            id={id}
          />
        ))}
      </div>
    </div>
  );
}
