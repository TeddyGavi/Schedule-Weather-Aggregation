import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root.tsx';
import ErrorPage from './pages/error-page.tsx';
import LoginPage from './pages/login.tsx';
import Welcome from './pages/welcome.tsx';
import RegisterPage from './pages/register.tsx';
import TodosPage from './pages/todos.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/',
        element: <Welcome />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      { path: '/todos', element: <TodosPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
