import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ITodo {
  title: string;
  status: string;
  id: string;
  completed: boolean;
  handleClickComplete: () => void;
}

export function Todo({
  title,
  status,
  id,
  completed,
  handleClickComplete,
}: ITodo) {
  return (
    <div
      id={id}
      key={id}
      className="m-2 w-full p-2 flex justify-between items-center border border-black rounded-lg"
    >
      <h2>{title}</h2>
      <div>
        <Badge>{status}</Badge>
      </div>
      {completed ? (
        <Button onClick={() => handleClickComplete} disabled variant="outline">
          Done!
        </Button>
      ) : (
        <Button onClick={() => handleClickComplete}>Complete?</Button>
      )}
    </div>
  );
}
