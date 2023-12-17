import { useEffect } from 'react';
import { Todo } from '../components/todo';
import axios from 'axios';
export default function TodosPage() {
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BE_BASE_URL}/todos/not/`, {
        withCredentials: true,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  });

  const handleClickeComplete = () => {
    console.log('click done');
  };
  return (
    <div className="bg-white bg-opacity-90 p-3 w-10/12 md:w-6/12 flex flex-col rounded-lg">
      <p className="text-center md:text-3xl drop-shadow-lg text-lg ">
        Not your Todos?
      </p>
      <Todo
        title="Test"
        status="todo"
        completed={false}
        handleClickComplete={handleClickeComplete}
        id="hi"
      />
    </div>
  );
}
