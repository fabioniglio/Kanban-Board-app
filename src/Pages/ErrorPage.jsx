import { Link } from "react-router-dom";
import classes from "../styles/ErrorPage.module.css";

const ErrorPage = () => {
  return (
    <div className={classes.container}>
      <h1>Error: Page Not found</h1>
      <Link to={"/"}>
        <button type="button" className={classes.backBtn}>
          Back
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
