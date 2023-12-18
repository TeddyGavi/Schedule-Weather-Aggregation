import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
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
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2).max(50),
  // .regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
  // .regex(new RegExp('.*\\d.*'), 'One number'),
});

export default function LoginPage() {
  const { signIn } = useAuth();
  const router = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const { email, password } = values;
    return await signIn(email, password, () => router('/todos'));
    // axios
    //   .post(
    //     `${import.meta.env.VITE_BE_BASE_URL}/auth/login`,
    //     {
    //       email,
    //       password,
    //     },
    //     {
    //       withCredentials: true,
    //     },
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     router('/todos');
    //   })
    //   .catch((err) => console.log(err));
    //
    // console.log(values);
  }
  return (
    <div className="bg-white bg-opacity-90 p-3 w-10/12 md:w-6/12 rounded-lg">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mx-auto w-full"
        >
          {' '}
          <p className="text-center md:text-3xl drop-shadow-lg  text-lg ">
            Hello! Please Login or Register
          </p>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@gmail.com"
                    type="email"
                    required
                    {...field}
                  />
                </FormControl>
                <FormDescription>Please enter a valid E-mail</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="password"
                    type="password"
                    required
                    {...field}
                  />
                </FormControl>
                <FormDescription>Please enter a valid Password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Login
          </Button>
        </form>
      </Form>

      <div className="relative flex mt-4 py-5 w-full text-sm items-center">
        <div className="flex-grow border border-t border-black"></div>
        <span className="flex-shrink mx-4 text-black">Need an Account?</span>
        <div className="flex-grow border  border-t border-black"></div>{' '}
      </div>
      <Link to={'/register'}>
        <Button className="w-full "> Register</Button>
      </Link>
    </div>
  );
}
