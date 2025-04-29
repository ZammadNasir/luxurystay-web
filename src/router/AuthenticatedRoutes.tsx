import Login from "../views/Login"

export function AuthenticatedRoutes() {
  const AuthRoutes = {
    path: "/",
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ]
  }

  return AuthRoutes
}
