import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root.tsx';
import ErrorPage from './pages/error-page.tsx';
import LoginPage from './pages/login.tsx';
import Welcome from './pages/welcome.tsx';
import RegisterPage from './pages/register.tsx';
import TodosPage from './pages/todos.tsx';
import { AuthProvider } from './context/auth-context.tsx';
import App from './App.tsx';

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
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>,
);
