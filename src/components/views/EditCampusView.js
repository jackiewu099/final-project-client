/*==================================================
EditCampus.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the edit single campus view page.
================================================== */
import { useState } from "react";
import styles from "./EditCampusView.module.css";

const EditCampusView = ({ campus, handleChange, onSubmit }) => {
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

  if (campus.description === null) campus.description = "No description available.";

  return (
    <div className={styles.pageContainer}>
      <h1>Edit Campus</h1>
      <form className={styles.card} onSubmit={onSubmit}>
        <img
          src={campus.imageURL || "https://via.placeholder.com/250"}
          alt={campus.campusName}
          className={styles.campusImage}
        />

        <div className={styles.campusInfo}>
          <label className={styles.label}>Campus Name</label>
          <input
            className={styles.input}
            type="text"
            name="campusName"
            value={campus.campusName}
            onChange={validate}
            required
          />
          {errors.campusName && <span className={styles.error}>{errors.campusName}</span>}

          <label className={styles.label}>Campus Address</label>
          <input
            className={styles.input}
            type="text"
            name="campusAddress"
            value={campus.campusAddress}
            onChange={validate}
            required
          />
          {errors.campusAddress && <span className={styles.error}>{errors.campusAddress}</span>}

          <label className={styles.label}>Image URL</label>
          <input
            className={styles.input}
            type="text"
            name="imageURL"
            value={campus.imageURL}
            onChange={handleChange}
          />

          <label className={styles.label}>Campus Description</label>
          <textarea
            className={styles.textarea}
            name="campusDescription"
            value={campus.campusDescription}
            onChange={handleChange}
            rows="4"
          />

          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.updateButton}>
              Update Campus
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditCampusView