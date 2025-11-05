/*==================================================
EditStudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the edit single student view page.
================================================== */
import { useState } from "react";
import styles from "./EditStudentView.module.css";

const EditStudentView = ({student, handleChange, handleSubmit}) => {
    const [errors, setErrors] = useState({ firstName: "", lastName: "", email: "" });

    const validate = (e) => {
        const { name, value } = e.target;
        let message = "";

        if ((name === "firstName" || name === "lastName") && !value.trim()) {
        message = `${name === "firstName" ? "First" : "Last"} name is required.`;
        } else if (name === "email") {
        if (!value.trim()) 
            message = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
            message = "Please enter a valid email address.";
        }

        setErrors({ ...errors, [name]: message });
        handleChange(e);
    };
    
    return (
        <div className={styles.editContainer}>
        <div className={styles.editCard}>
            <h1 className={styles.title}>Edit Student</h1>
            <img
            src={student.imageUrl || "https://via.placeholder.com/150"}
            alt={`${student.firstName} ${student.lastName}`}
            className={styles.studentImage}
            />

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>First Name</label>
                    <input
                        className={styles.input}
                        type="text"
                        name="firstName"
                        value={student.firstName || ""}
                        onChange={validate}
                        required
                    />
                    {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Last Name</label>
                    <input
                        className={styles.input}
                        type="text"
                        name="lastName"
                        value={student.lastName || ""}
                        onChange={validate}
                        required
                    />
                    {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Email</label>
                    <input
                        className={styles.input}
                        type="email"
                        name="email"
                        value={student.email || ""}
                        onChange={validate}
                        required
                    />
                    {errors.email && <span className={styles.error}>{errors.email}</span>}
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>GPA</label>
                    <input
                        className={styles.input}
                        type="number"
                        name="gpa"
                        min="0"
                        max="4"
                        step="0.1"
                        value={student.gpa || 0}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Image URL</label>
                    <input
                        className={styles.input}
                        type="text"
                        name="imageUrl"
                        value={student.imageUrl || ""}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Campus ID</label>
                    <input
                        className={styles.input}
                        type="text"
                        name="campusId"
                        value={student.campusId || ""}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.updateButton}>
                    Update Student
                    </button>
                </div>
            </form>
        </div>
        </div>
    );
}

export default EditStudentView;