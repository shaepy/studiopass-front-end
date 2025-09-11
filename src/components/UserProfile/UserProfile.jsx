import { useParams } from "react-router";
import { useState, useEffect } from "react";
import * as userApi from "../../services/userService";
import styles from "./UserProfile.module.css";

const UserProfile = ({ linkToClassPage }) => {
  const { userId } = useParams();
  const [userObject, setUserObject] = useState({});
  console.log("userId:", userId);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await userApi.getUser(userId);
      console.log("userData:", userData);
      setUserObject(userData);
    };
    fetchUser();
  }, [userId]);

  if (!userObject.user) {
    return (
      <main>
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className={styles.userProfileMain}>
      <header>
        <h1>
          {userObject.user.firstName} {userObject.user.lastName}
        </h1>
      </header>
      <div>
        <h2 style={{ fontWeight: "600" }}>Account</h2>
        <p>Username: {userObject.user.username}</p>
      </div>
      <div>
        <h2 style={{ fontWeight: "600" }}>Profile</h2>
        <p>
          Name: {userObject.user.firstName} {userObject.user.lastName}
        </p>
        <p>Email: {userObject.user.email}</p>
      </div>
      <section>
        <h2 style={{ fontWeight: "600" }}>Upcoming</h2>
        {userObject.userBookings &&
          userObject.userBookings.map(
            (booking) =>
              booking.status === "active" &&
              booking.sessionId.status === "scheduled" && (
                <article key={booking._id} className={styles.card}>
                  <header>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: "500" }}>
                      {booking.sessionId.title}
                    </h3>
                  </header>
                  <div>
                    <p>
                      {booking.startDate} • {booking.startTime} -{" "}
                      {booking.endTime}
                    </p>
                    <button
                      onClick={() => linkToClassPage(booking.sessionId._id)}>
                      View
                    </button>
                  </div>
                </article>
              )
          )}
      </section>
    </main>
  );
};

export default UserProfile;
