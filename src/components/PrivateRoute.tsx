import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminContext } from "../pages/admin/AdminContext";
import type { JSX } from "react";

interface PrivateRouteProps {
  children: JSX.Element;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const context = useContext(AdminContext);

  if (!context) {
    return null; 
  }

  if (context.loading) {
    return <div><h1>Carregando...</h1></div>;
  }

  if (!context.authenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}
