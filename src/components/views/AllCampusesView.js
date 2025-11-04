/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./AllCampusesView.module.css"; // import CSS module

const AllCampusesView = ({ allCampuses }) => {
  if (!allCampuses.length) {
    return <div className={styles.noCampuses}>There are no campuses.</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>All Campuses</h1>

      <div className={styles.cardGrid}>
        {allCampuses.map((campus) => (
          <Link key={campus.id} to={`/campus/${campus.id}`} className={styles.cardLink}>
            <div className={styles.card}>
              <img
                src={campus.imageURL || "https://via.placeholder.com/150"}
                alt={campus.name}
                className={styles.cardImage}
              />
              <h2 className={styles.cardTitle}>{campus.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;
