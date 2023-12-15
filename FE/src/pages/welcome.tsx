import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div>
      <h1>Welcome to the last Todo app you will need!</h1>
      <p>There is just one catch... sign up to find out!</p>
      <Link to={`/login`}>
        <Button>Login here!</Button>
      </Link>
    </div>
  );
}
