import { Navigate, useLocation, useRoutes } from "react-router-dom";
import routes from "./routes";
import { useAuth } from "../App/AuthProvider";

export default function RouteComponent() {
  let auth = useAuth();
  let location = useLocation();

  return useRoutes(routes.map(mapRoute));

  function mapRoute(route) {
    const component = <route.component />;
    const navigate = <Navigate to={auth.user ? "/" : "/login"} state={{ from: location }} replace />;

    route.element = ((route.guest && auth.user) || (route.account && !auth.user)) ? navigate : component;
    return route;
  }
}
