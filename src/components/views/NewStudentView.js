/*==================================================
NewStudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new student page.
================================================== */

import {useState } from "react";
import styles from "./NewStudentView.module.css";

const NewStudentView = ({ handleChange, handleSubmit, serverErrors }) => {
  const [errors, setErrors] = useState({ firstname: "", lastname: "", email: "" });

  // Real-time validation for required fields 
  const validate = (e) => {
    const { name, value } = e.target;
    let message = "";

    if ((name === "firstname" || name === "lastname") && !value.trim()) {
      message = `${name === "firstname" ? "First" : "Last"} name is required.`;
    } else if (name === "email") {
      if (!value.trim()) message = "Email is required.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        message = "Please enter a valid email address.";
    }

    setErrors({ ...errors, [name]: message });
    handleChange(e);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>Add a New Student</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* First Name */}
          <div className={styles.inputGroup}>
            <label>First Name</label>
            <input type="text" name="firstname" onChange={validate} />
            {errors.firstname && <span className={styles.error}>{errors.firstname}</span>}
          </div>

          {/* Last Name */}
          <div className={styles.inputGroup}>
            <label>Last Name</label>
            <input type="text" name="lastname" onChange={validate} />
            {errors.lastname && <span className={styles.error}>{errors.lastname}</span>}
          </div>

          {/* Email */}
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input type="email" name="email" onChange={validate} />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>

          {/* Image URL (optional) */}
          <div className={styles.inputGroup}>
            <label>Image URL (optional)</label>
            <input type="text" name="imageUrl" onChange={handleChange} />
          </div>

          {/* GPA (optional) */}
          <div className={styles.inputGroup}>
            <label>GPA (optional)</label>
            <input
              type="number"
              name="gpa"
              step="0.1"
              min="0.0"
              max="4.0"
              onChange={handleChange}
            />
          </div>

          {/* Campus ID (optional) */}
          <div className={styles.inputGroup}>
            <label>Campus ID (optional)</label>
            <input type="text" name="campusId" onChange={handleChange} />
          </div>

          <button type="submit" className={styles.submitButton}>
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewStudentView;
