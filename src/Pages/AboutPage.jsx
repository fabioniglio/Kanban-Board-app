import classes from "../styles/AboutPage.module.css";

function AboutPage() {
  return (
    <div className={classes.container}>
      <div className={classes.appDetails}>
        <div className={classes.appText}>
          <p>Kanban App!</p>
          <p>
            Kanban App is your go-to solution for streamlined task management.
            Designed for both individuals and teams, it offers a simple yet
            powerful way to organize, track, and update tasks. Quickly add tasks
            to your "To Do" column, and as you make progress, move them through
            "Doing" to "Done." This visual approach not only keeps your workflow
            organized but also visibly tracks your accomplishments.
          </p>
        </div>
      </div>

      <div className={classes.developerContainer}>
        <div className={classes.profile}>
          <div className={classes.profilePicture}></div>
          <p className={classes.profileDetails}>Fabio Niglio</p>
        </div>
        <div className={classes.profile}>
          <div className={classes.profilePicture}></div>
          <p className={classes.profileDetails}>Fabio Niglio</p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
