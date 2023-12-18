import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ITodo {
  title: string;
  status: string;
  id: string;
  completed: boolean;
  handleClickedComplete: (id: string) => void;
  handleClickDelete: (id: string) => void;
  completed_at: string;
  created_at: string;
  ownerFirstName: string;
}

export function Todo({
  title,
  status,
  id,
  completed,
  handleClickedComplete,
  completed_at,
  created_at,
  handleClickDelete,
  ownerFirstName,
}: ITodo) {
  const getReadableDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };
  return (
    <div
      className="m-2 w-10/12 mx-auto p-1 flex flex-col gap-4 md:gap-0  justify-between items-center border border-black rounded-lg"
      key={id}
    >
      <p className="font-bold ">Owner: {ownerFirstName} </p>
      <div
        id={id}
        className="w-full mx-auto items-center flex lg:flex-row flex-col gap-4 md:gap-0"
      >
        <h2 className="w-full">{title}</h2>
        <div className="px-4">
          <Badge className={`${completed ? 'bg-green-500' : ''} `}>
            {status}
          </Badge>
        </div>
        {completed ? (
          <Button onClick={() => handleClickDelete(id)} variant="destructive">
            Delete
          </Button>
        ) : (
          <Button onClick={() => handleClickedComplete(id)}>Complete?</Button>
        )}
      </div>
      <div className="flex w-full mx-auto items-center justify-between">
        <div>
          <span className="font-bold">Completed at: </span>
          {completed_at ? getReadableDate(completed_at) : 'Not Yet!'}
        </div>
        <div>
          <span className="font-bold">Created at:</span>{' '}
          {getReadableDate(created_at)}
        </div>
      </div>
    </div>
  );
}
