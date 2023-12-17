import { Outlet } from 'react-router-dom';
export default function Root() {
  return (
    <main className="bg-[url('/public/background-todos.png')] bg-no-repeat bg-center bg-cover h-screen mx-auto items-center flex flex-col justify-center">
      <Outlet />
    </main>
  );
}
