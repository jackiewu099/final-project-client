/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";
import styles from "./StudentView.module.css";

const StudentView = ({ student }) => {
  const campusMessage = student.campus
    ? student.campus.name
    : "This student is not currently enrolled in a campus.";

  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <img
          src={student.imageUrl}
          alt={`${student.firstName} ${student.lastName}`}
          className={styles.studentImage}
        />
        <div className={styles.studentInfo}>
          <h1 className={styles.studentName}>
            {student.firstName} {student.lastName}
          </h1>
          <p className={styles.studentEmail}>{student.email}</p>
          <p className={styles.studentGpa}>
            <strong>GPA:</strong> {student.gpa ?? "N/A"}
          </p>

          {/* Campus info with navigation if exists */}
          {student.campus ? (
            <p className={styles.studentCampus}>
              Campus:{" "}
              <Link to={`/campus/${student.campus.id}`} className={styles.campusLink}>
                {student.campus.name}
              </Link>
            </p>
          ) : (
            <p className={styles.studentCampus}>{campusMessage}</p>
          )}

          {/* Action buttons */}
          <div className={styles.buttonContainer}>
            <Link to={`/editstudent/${student.id}`}>
              <button className={styles.editButton}>Edit Student</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentView;

