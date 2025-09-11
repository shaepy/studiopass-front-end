import { UserContext } from "../../contexts/UserContext";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router";
import * as sessionApi from "../../services/sessionService";
import styles from "./Schedule.module.css";

const Schedule = ({ handleAddBooking, linkToClassPage }) => {
  const [sessions, setSessions] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchAllSessions = async () => {
      const sessionsData = await sessionApi.index();
      setSessions(sessionsData);
    };
    fetchAllSessions();
  }, [user]);

  if (!sessions) return <p>Loading...</p>;

  if (sessions.length < 1) {
    return (
      <main className={styles.container}>
        <h1>Class Schedule</h1>
        <p>There are no classes available right now.</p>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <h1>Class Schedule</h1>
      <section>
        <table className="table-auto">
          <thead>
            <tr>
              <th>Class</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Instructor</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr className={`${styles.card} p-9`}>
                <td style={{ fontWeight: "600" }}>{session.title}</td>
                <td>{session.startDate}</td>
                <td>{session.startTime}</td>
                <td>{session.endTime}</td>
                <td>{session.instructorName}</td>
                <td>
                  <button
                    className={styles.viewButton}
                    onClick={() => linkToClassPage(session._id)}>
                    View
                  </button>
                </td>
                <td>
                  {user &&
                    user.role === "student" &&
                    (session.reservedStatus ? (
                      <button
                        disabled
                        className={`${styles.disabledButton} ${styles.studentBookButton}`}>
                        Booked
                      </button>
                    ) : session.bookings.length >= session.capacity ? (
                      <button
                        disabled
                        className={`${styles.disabledButton} ${styles.studentBookButton}`}>
                        Full
                      </button>
                    ) : (
                      <button
                        className={styles.studentBookButton}
                        onClick={() => handleAddBooking(session._id, user._id)}>
                        Book
                      </button>
                    ))}
                  {user &&
                    (user.role === "instructor" || user.role === "owner") && (
                      <>
                        <p>
                          {session.bookings.length}/{session.capacity} booked.
                        </p>
                      </>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Schedule;
