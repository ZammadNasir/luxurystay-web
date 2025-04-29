import { useRoutes } from "react-router-dom";
import { MainAppRoutes } from "./MainAppRoutes";

export function AppRoute() {
  let routes;
  
  // if (!user) {
  //   routes = [AuthenticatedRoutes()];
  // } else {
    routes = [MainAppRoutes()];
  // }
  // routes = [AuthenticatedRoutes()] as any;

  return useRoutes(routes);
}

export default AppRoute;
