import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="h-screen w-screen flex flex-col justify-center items-center gap-3"
    >
      <h1 className="text-3xl uppercase font-bold">Oops!</h1>
      <p className="text-2xl">Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
