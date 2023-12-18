import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';

const newTodoSchema = z.object({
  task: z.string().min(3),
  completed: z.boolean(),
  created_at: z.string(),
  completed_at: z.string().nullish(),
});

export default function NewTodoFormInput() {
  const form = useForm<z.infer<typeof newTodoSchema>>({
    resolver: zodResolver(newTodoSchema),
    defaultValues: {
      task: '',
      completed: false,
      created_at: new Date(Date.now()).toISOString(),
      completed_at: null,
    },
  });

  function onSubmitNewTodo(values: z.infer<typeof newTodoSchema>) {
    const { task, created_at, completed, completed_at } = values;
    axios
      .post(
        `${import.meta.env.VITE_BE_BASE_URL}/todos`,
        { task, created_at, completed, completed_at },
        { withCredentials: true },
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitNewTodo)}>
        <p className=" text-center underline">Add a New Todo</p>
        <FormField
          control={form.control}
          name="task"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task</FormLabel>
              <FormControl>
                <Input placeholder="Todo..." type="text" required {...field} />
              </FormControl>
              <FormDescription>Enter a todo for someone else</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add New Todo!</Button>
      </form>
    </Form>
  );
}
