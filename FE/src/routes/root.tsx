import { Outlet } from 'react-router-dom';
export default function Root() {
  return (
    <main className="max-w-7xl h-screen mx-auto items-center flex flex-col justify-center">
      <Outlet />
    </main>
  );
}
