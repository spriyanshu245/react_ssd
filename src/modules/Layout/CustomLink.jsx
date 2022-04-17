import { NavLink } from "react-router-dom";

export default function CustomLink({ children, to, ...props }) {
  return (
    <NavLink className={(isActive) => (isActive ? "active" : "")} to={to} {...props}>
      {children}
    </NavLink>
  );
}
