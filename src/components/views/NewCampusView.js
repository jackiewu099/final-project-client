/*==================================================
NewCampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new student page.
================================================== */
import {useState } from "react";    
import styles from "./NewCampusView.module.css";

const NewCampusView = ({ handleChange, handleSubmit }) => {
    const [errors, setErrors] = useState({ campusName: "", campusAddress: "" });

    // Real-time validation for required fields
    const validate = (e) => {
        const {name, value} = e.target;
        let message = "";

        if (name === "campusName" && !value.trim()) {
            message = "Campus name is required.";
        } else if (name === "campusAddress" && !value.trim()) {
            message = "Campus address is required.";
        }

        setErrors({ ...errors, [name]: message });
        handleChange(e);
    }

    return (
        <div className={styles.pageContainer}>
        <div className={styles.formContainer}>
            <h1 className={styles.formTitle}>Add a New Campus</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
            {/* Campus name */}
            <div className={styles.inputGroup}>
                <label>Campus name</label>
                <input type="text" name="campusName" onChange={validate} />
                {errors.campusName && <span className={styles.error}>{errors.campusName}</span>}
            </div>

            {/* Campus address */}
            <div className={styles.inputGroup}>
                <label>Campus address</label>
                <input type="text" name="campusAddress" onChange={validate} />
                {errors.campusAddress && <span className={styles.error}>{errors.campusAddress}</span>}
            </div>

            <div className= {styles.inputGroup}>
                <label>Campus description</label>
                <textarea className={styles.campusInput} name="campusdescription" onChange={validate} />
            </div>

            {/* Image URL (optional) */}
            <div className={styles.inputGroup}>
                <label>Image URL (optional)</label>
                <input type="text" name="imageUrl" onChange={handleChange} />
            </div>

            <button type="submit" className={styles.submitButton}>
                Add Campus
            </button>
            </form>
        </div>
    </div>
    )
}

export default NewCampusView;