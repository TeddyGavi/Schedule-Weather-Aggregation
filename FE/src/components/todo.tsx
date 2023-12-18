import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ITodo {
  title: string;
  status: string;
  id: string;
  completed: boolean;
  handleClickComplete: (id: string) => void;
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
      className="m-2 w-9/12 mx-auto p-2 flex justify-between items-center border border-black rounded-lg"
    >
      <h2 className="w-full">{title}</h2>
      <div className="px-4">
        <Badge className={`${completed ? 'bg-green-500' : ''}`}>{status}</Badge>
      </div>
      {completed ? (
        <Button
          onClick={() => handleClickComplete(id)}
          disabled
          variant="outline"
        >
          Done!
        </Button>
      ) : (
        <Button onClick={() => handleClickComplete(id)}>Complete?</Button>
      )}
    </div>
  );
}
