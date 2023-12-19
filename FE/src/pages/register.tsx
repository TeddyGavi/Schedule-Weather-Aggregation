import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import axiosInstance from '../fetching/axios-config';

const formSchema = z.object({
  email: z.string().email().trim(),
  password: z
    .string()
    .min(2)
    .max(50)
    .regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
    .regex(new RegExp('.*\\d.*'), 'One number'),
  firstName: z.string().min(1).trim(),
  lastName: z.string().min(1),
});

export default function RegisterPage() {
  const router = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const { email, firstName, lastName, password } = values;
    axiosInstance
      .post(`/auth/register`, {
        email,
        firstName,
        lastName,
        password,
      })
      .then(() => router('/todos'))
      .catch((err) => console.log(err));
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
            Sign Up Here!
          </p>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fist Name</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="first name"
                    placeholder="First Name"
                    type="text"
                    required
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter your First Name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="last name"
                    placeholder="Last Name"
                    type="text"
                    required
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter your Last Name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="new-email"
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
                    autoComplete="new-password"
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
            Submit
          </Button>
        </form>
      </Form>
      <div className="relative flex mt-4 py-5 w-full text-sm items-center">
        <div className="flex-grow border border-t border-black"></div>
        <span className="flex-shrink mx-4 text-black">Back to Login?</span>
        <div className="flex-grow border  border-t border-black"></div>{' '}
      </div>
      <Link to={'/login'}>
        <Button className="w-full "> Login?</Button>
      </Link>
    </div>
  );
}
