import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function PaginationCount({
  page,
  handleCountUp,
  handleCountDown,
}) {
  const [count, setCount] = useState(1);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      Next Page?
      <div className="flex items-center gap-4">
        <Button className="h-4 w-2" onClick={handleCountDown}>
          -
        </Button>
        <div className="font-bold">{page}</div>

        <Button className="h-4 w-2" onClick={handleCountUp}>
          +
        </Button>
      </div>
    </div>
  );
}
