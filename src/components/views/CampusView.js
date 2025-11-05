/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
import styles from "./CampusView.module.css"; // Import CSS module

const CampusView = ({ campus, deleteStudent }) => {
  if (!campus) return <div className={styles.noCampus}>Campus not found.</div>;
  if (campus.description === null) campus.description = "No description available.";

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

        <div className={styles.buttonContainer}>
          <Link to="/newstudent" className={styles.buttonLink}>
            <button className={styles.addStudentButton}>Add Student</button>
          </Link>
          <Link to={`/editcampus/${campus.id}`} className={styles.buttonLink}>
            <button className={styles.editCampusButton}>Edit Campus</button>
          </Link>
        </div>
      </div>

      {/* Students Section */}
      <div className={styles.studentsSection}>
        <h2>Students</h2>
        {campus.students.length ? (
          <div className={styles.studentGrid}>
            {campus.students.map((student) => (
              <div key={student.id} className={styles.studentCardWrapper}>
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
                <button
                  className={styles.deleteStudentButton}
                  onClick={() => deleteStudent(student.id)}
                >
                  &times;
                </button>
              </div>
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

