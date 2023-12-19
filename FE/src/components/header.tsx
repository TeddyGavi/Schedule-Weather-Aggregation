import { Button } from '@/components/ui/button';
import { useAuth } from '../hooks/use-auth';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { logOut } = useAuth();
  const router = useNavigate();

  const handleLogout = async () => {
    await logOut(() => router('/login'));
  };
  return (
    <div className="flex gap-2 items-center ">
      <p className="pr-4 ">Hi!</p>
      <Button onClick={handleLogout} className=" border border-black">
        Logout
      </Button>
    </div>
  );
}
