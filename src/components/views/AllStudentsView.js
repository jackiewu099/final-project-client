/*==================================================
AllStudentsView.js
================================================== */
import { Link } from "react-router-dom";
import "./AllStudentsView.css";

const AllStudentsView = (props) => {
  const { students, deleteStudent } = props;

  // If there is no student, display a message
  if (!students.length) {
    return (
      <div className="no-students">
        <p>There are no students.</p>
        <Link to="/newstudent" className="add-student-button-link">
          <button className="add-student-button">Add New Student</button>
        </Link>
      </div>
    );
  }

  // If there is at least one student, render All Students view 
  return (
    <div className="all-students-container">
      <h1>All Students</h1>

      {students.map((student) => {
        let name = student.firstName + " " + student.lastName;
        return (
          <div key={student.id} className="student-card">
            <Link to={`/student/${student.id}`}>
              <h2>{name}</h2>
            </Link>
            <button onClick={() => deleteStudent(student.id)}>Delete</button>
          </div>
        );
      })}

      <Link to="/newstudent" className="add-student-button-link">
        <button className="add-student-button">Add New Student</button>
      </Link>
    </div>
  );
};

export default AllStudentsView;
