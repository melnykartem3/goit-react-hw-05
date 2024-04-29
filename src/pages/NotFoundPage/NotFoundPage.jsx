import { NavLink } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <p>Oops! Page not found! Ssory!</p>
      <p>
        Please visit our link <NavLink to="/">home page</NavLink>
      </p>
    </div>
  );
}
