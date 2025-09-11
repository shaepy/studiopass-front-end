import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import { Link } from "react-router";
import balletClassImg from "../../assets/img/ballet-class.jpg";
import { useNavigate } from "react-router";
import styles from "./Landing.module.css";

const Landing = () => {
  const navigate = useNavigate();

  const linkToBookAClass = () => {
    navigate("/schedule");
  };

  const linkToRegister = () => {
    navigate("/sign-up");
  };

  const linkToAgenda = () => {
    navigate("/agenda");
  };

  const { user } = useContext(UserContext);
  return (
    <div
      style={{
        width: "100vw",
        height: "100%",
        zIndex: -1,
        backgroundImage: `url(${balletClassImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <main style={{ position: "relative", zIndex: 1, paddingTop: "20px" }}>
        <header>
          <h1 className={styles.landingH1}>Grand Academy of Ballet</h1>
        </header>
        <section className={styles.card}>
          {user ? (
            <main>
              {" "}
              <section>
                {user.role === "student" && (
                  <>
                    <p>Your training continues, {user.username}.</p>
                    <p>Step back into the discipline and beauty of ballet.</p>
                    <button
                      className={styles.landingCta}
                      onClick={linkToBookAClass}>
                      Book a Class
                    </button>
                  </>
                )}
                {(user.role === "instructor" || user.role === "owner") && (
                  <>
                    <p>Welcome back, {user.username}.</p>
                    <p>Ready to spread some ballet magic today?</p>
                    <button
                      className={styles.landingCta}
                      onClick={linkToAgenda}>
                      View Schedule
                    </button>
                  </>
                )}
              </section>
            </main>
          ) : (
            <main>
              {" "}
              <section className={styles.homeContent}>
                <p>Ballet is where tradition meets transformation.</p>
                <p>
                  Our academy inspires dancers of every age to find discipline,
                  artistry, and joy in ballet and movement.
                </p>
                <p>The stage begins with a single step.</p>
                <button className={styles.landingCta} onClick={linkToRegister}>
                  Enroll Today
                </button>
              </section>
            </main>
          )}
        </section>
        <p className={styles.learnMoreLink}>
          <Link to="/about">Learn more about the history of our academy.</Link>
        </p>
      </main>
    </div>
  );
};

export default Landing;
