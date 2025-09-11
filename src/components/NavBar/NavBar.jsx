import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const linkToSignIn = () => {
    navigate("/sign-in");
  };

  return (
    <nav className={styles.container}>
      {user ? (
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/agenda">My Agenda</Link>
          </li>
          <li>
            <Link to="/schedule">Class Schedule</Link>
          </li>
          {user.role === "owner" && (
            <li>
              <Link to="/admin/new-session">Add Class</Link>
            </li>
          )}
          <li>
            <button className={styles.authButton} onClick={handleSignOut}>
              Sign Out
            </button>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/schedule">Class Schedule</Link>
          </li>
          <li>
            <Link to="/sign-up">New Student</Link>
          </li>
          <li>
            <Link to="/sign-up?role=instructor">Staff Sign Up</Link>
          </li>
          <li>
            <button className={styles.authButton} onClick={linkToSignIn}>
              Sign In
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
