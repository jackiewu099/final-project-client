/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
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
          <p className={styles.studentCampus}>{campusMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentView;
