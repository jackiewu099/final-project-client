/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
import styles from "./CampusView.module.css"; // Import CSS module

const CampusView = ({ campus }) => {
  if (!campus) return <div className={styles.noCampus}>Campus not found.</div>;

  return (
    <div className={styles.pageContainer}>
      {/* Campus Card */}
      <div className={styles.card}>
        <img
          src={campus.imageURL || "https://via.placeholder.com/250"}
          alt={campus.name}
          className={styles.campusImage}
        />
        <div className={styles.campusInfo}>
          <h1 className={styles.campusName}>{campus.name}</h1>
          <p className={styles.campusAddress}>{campus.address}</p>
          <p className={styles.campusDescription}>{campus.description}</p>
        </div>
      </div>

      {/* Students Section */}
      <div className={styles.studentsSection}>
        <h2>Students</h2>
        {campus.students.length ? (
          <div className={styles.studentGrid}>
            {campus.students.map((student) => (
              <Link
                to={`/student/${student.id}`}
                key={student.id}
                className={styles.studentCard}
              >
                <img
                  src={student.imageUrl || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                  alt={`${student.firstName} ${student.lastName}`}
                  className={styles.studentImage}
                />
                <div className={styles.studentInfo}>
                  <h3 className={styles.studentName}>
                    {student.firstName} {student.lastName}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p>This campus currently has no students enrolled.</p>
        )}
      </div>
    </div>
  );
};

export default CampusView;

