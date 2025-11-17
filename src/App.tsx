import { createBrowserRouter } from "react-router-dom"

import { Home } from "./pages/home"
import { LoginPage } from "./pages/auth/login"
import { RegisterPage } from "./pages/auth/register"
import { ErrorPage } from "./pages/error"
import PrivateRoute from "./components/PrivateRoute"

const router = createBrowserRouter([
  {
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
    path: '/',
  },
  {
    element: <LoginPage />,
    path: '/login',
  },
  {
    element: <RegisterPage />,
    path: '/register',
  },
  {
    element: <ErrorPage />,
    path: '*',
  },
]);

export { router }