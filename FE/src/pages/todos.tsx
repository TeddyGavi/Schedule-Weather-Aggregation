import { useEffect, useState } from 'react';
import { Todo } from '../components/todo';
import axios from 'axios';
import NewTodoFormInput from '../components/new-todo';
import Header from '../components/header';
import { PaginationCount } from '../components/pagination-count';

interface ITodoDB {
  id: string;
  task: string;
  completed_at: string;
  created_at: string;
  completed: boolean;
  ownerFirstName: string;
}
type Todos = { todosByOthers: ITodoDB[]; count: number };

export default function TodosPage() {
  const [todoList, setTodoList] = useState<Todos>({
    todosByOthers: [],
    count: 0,
  });
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(`${import.meta.env.VITE_BE_BASE_URL}/todos/not?page=${page}`, {
        withCredentials: true,
        signal: controller.signal,
      })
      .then((res) => {
        setTodoList(res.data);
      })
      .catch((err) => console.log(err));

    return () => controller.abort();
  }, [page]);

  const handleCountUp = () => {
    setPage((prev) => (prev += 10));
  };

  const handleCountDown = () => {
    setPage((prev) => (prev === 0 ? 0 : (prev -= 10)));
  };

  const handleClickedComplete = (id: string) => {
    axios
      .patch(
        `${import.meta.env.VITE_BE_BASE_URL}/todos/update/${id}`,
        {
          completed_at: new Date(Date.now()),
          completed: true,
        },
        { withCredentials: true },
      )
      .then(() => {
        axios
          .get(`${import.meta.env.VITE_BE_BASE_URL}/todos/not`, {
            withCredentials: true,
          })
          .then((res) => {
            setTodoList(res.data);
          });
      })
      .catch((err) => console.log(err));
  };

  const handleClickDelete = (id: string) => {
    axios
      .delete(`${import.meta.env.VITE_BE_BASE_URL}/todos/delete/${id}`, {
        withCredentials: true,
      })
      .then(() => {
        axios
          .get(`${import.meta.env.VITE_BE_BASE_URL}/todos/not`, {
            withCredentials: true,
          })
          .then((res) => {
            setTodoList(res.data);
          });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="bg-white bg-opacity-90 gap-12 h-[90vh] p-3 w-10/12 md:w-6/12 flex flex-col rounded-lg ">
      <div className="flex justify-evenly">
        <p className="text-center md:text-3xl drop-shadow-lg text-lg ">
          Not your Todos?
        </p>
        <Header />
      </div>
      <div>
        <NewTodoFormInput />
      </div>
      <div className=" rounded-lg p-4 scroll-mx-2 overflow-auto">
        {todoList.todosByOthers.map(
          ({
            id,
            completed,
            task,
            completed_at,
            created_at,
            ownerFirstName,
          }) => (
            <Todo
              key={id}
              title={task}
              status={completed ? 'Done' : 'Todo'}
              completed={completed}
              handleClickedComplete={handleClickedComplete}
              handleClickDelete={handleClickDelete}
              id={id}
              completed_at={completed_at}
              created_at={created_at}
              ownerFirstName={ownerFirstName}
            />
          ),
        )}
      </div>{' '}
      <PaginationCount
        page={page}
        handleCountDown={handleCountDown}
        handleCountUp={handleCountUp}
      />
    </div>
  );
}
