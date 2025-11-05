/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a list of campuses.
================================================== */

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./AllCampusesView.module.css";

const AllCampusesView = ({ allCampuses, deleteCampus }) => {
  if (!allCampuses.length) {
    return (
      <div className={styles.noCampuses}>
        There are no campuses.
        <div className={styles.addButtonContainer}>
          <Link to="/newcampus" className={styles.addCampusButton}>
            + Add New Campus
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerRow}>
        <h1 className={styles.pageTitle}>All Campuses</h1>
        <Link to="/newcampus" className={styles.addCampusButton}>
          + Add New Campus
        </Link>
      </div>

      <div className={styles.cardGrid}>
        {allCampuses.map((campus) => (
          <div key={campus.id} className={styles.cardWrapper}>
            <Link to={`/campus/${campus.id}`} className={styles.cardLink}>
              <div className={styles.card}>
                <img
                  src={campus.imageURL || "https://via.placeholder.com/150"}
                  alt={campus.name}
                  className={styles.cardImage}
                />
                <h2 className={styles.cardTitle}>{campus.name}</h2>
              </div>
            </Link>
            <button
              className={styles.deleteCampusButton}
              onClick={(e) => {
                e.preventDefault(); // prevent navigation
                deleteCampus(campus.id);
              }}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
  deleteCampus: PropTypes.func.isRequired,
};

export default AllCampusesView;


