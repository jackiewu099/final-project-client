import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./AllCampusesView.module.css";

const AllCampusesView = ({ allCampuses, deleteCampus }) => {
  if (!allCampuses.length) {
    return <div className={styles.noCampuses}>There are no campuses.</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>All Campuses</h1>

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

