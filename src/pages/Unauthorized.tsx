import { Link } from "react-router";

export default function Unauthorized() {
  return (
    <div>
      <h1>You are not permitted to visit this page</h1>
      <Link to="/">Home</Link>
    </div>
  );
}
