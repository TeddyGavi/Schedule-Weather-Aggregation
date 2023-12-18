import { useState } from 'react';
import { Todo } from '../components/todo';
import axios from 'axios';
import NewTodoFormInput from '../components/new-todo';
import Header from '../components/header';
import { PaginationCount } from '../components/pagination-count';
import { GETTodos } from '../fetching/GET-todos';
import useSWR from 'swr';
import { Skeleton } from '@/components/ui/skeleton';

interface ITodoDB {
  id: string;
  task: string;
  completed_at: string;
  created_at: string;
  completed: boolean;
  ownerFirstName: string;
}
export type Todos = {
  todosByOthers: ITodoDB[];
  count: number;
  totalPages: number;
};

export default function TodosPage() {
  const [page, setPage] = useState<number>(1);
  const {
    data: todoList,
    isLoading,
    mutate,
  } = useSWR<Todos>(['/todos', page], () => GETTodos(page));

  const handleCountUp = () => {
    setPage((prev) => (prev += 1));
  };

  const handleCountDown = () => {
    setPage((prev) => (prev <= 1 ? 1 : (prev -= 1)));
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
        mutate(todoList);
      })
      .catch((err) => console.log(err));
  };

  const handleClickDelete = (id: string) => {
    axios
      .delete(`${import.meta.env.VITE_BE_BASE_URL}/todos/delete/${id}`, {
        withCredentials: true,
      })
      .then(() => {
        mutate(todoList);
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
        <NewTodoFormInput mutate={mutate} />
      </div>
      <div className=" rounded-lg p-4 scroll-mx-2 h-full overflow-auto">
        {isLoading ? (
          <div className="flex flex-col gap-4 ">
            {Array.from({ length: 10 }, (_, index) => (
              <Skeleton key={index} className="w-10/12 h-14" />
            ))}{' '}
          </div>
        ) : (
          todoList?.todosByOthers.map(
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
          )
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
