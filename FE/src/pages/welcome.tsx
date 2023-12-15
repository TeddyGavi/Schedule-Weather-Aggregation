import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div className="flex flex-col bg-opacity-90 p-3 rounded-lg bg-white items-center justify-center gap-4 ">
      <h1 className="text-4xl drop-shadow-lg">
        Welcome to the last Todo app you will need!
      </h1>
      <p className="text-2xl  ">
        There is just one catch... sign up to find out!
      </p>
      <div className="relative flex py-5 w-full items-center">
        <div className="flex-grow border border-t border-black"></div>
        <span className="flex-shrink mx-4 text-black">If you dare...</span>
        <div className="flex-grow border  border-t border-black"></div>{' '}
      </div>
      <Link to={`/login`}>
        <Button>Login here!</Button>
      </Link>
    </div>
  );
}
