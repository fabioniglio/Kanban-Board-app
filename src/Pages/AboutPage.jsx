import classes from "../styles/AboutPage.module.css";
import jinishaProfilePhoto from "../assets/images/jinisha-patel.jpg";
import fabioProfilePhoto from "../assets/images/fabio-niglio.jpg";
import linkedinIcon from "../assets/images/linkedin.png";
import githubIcon from "../assets/images/github.png";

function AboutPage() {
  return (
    <div className={classes.container}>
      <div className={classes.appDetails}>
        <h3>Kanban App!</h3>
        <p>
          Kanban App is your go-to solution for streamlined task management. It
          offers a simple yet powerful way to organize, track, and update tasks.
          Quickly add tasks to your "To Do" column, and as you make progress,
          move them through "In Progress" to "Done." This visual approach not
          only keeps your workflow organized but also visibly tracks your
          accomplishments.
        </p>
      </div>

      <div className={classes.developerContainer}>
        <div className={classes.profile}>
          <img
            src={jinishaProfilePhoto}
            alt="Jinisha Profile"
            className={classes.profilePictureJinisha}
          />
          <p className={classes.profileName}>Jinisha Patel</p>
          <div className={classes.iconContainer}>
            <a
              href="https://www.linkedin.com/in/jinishakheni/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={linkedinIcon}
                alt="Linkedin Icon"
                className={classes.icon}
              />
            </a>
            <a
              href="https://github.com/jinishakheni/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={githubIcon}
                alt="Github Icon"
                className={classes.icon}
              />
            </a>
          </div>
        </div>
        <div className={classes.profile}>
          <img
            src={fabioProfilePhoto}
            alt="Fabio Profile"
            className={classes.profilePictureFabio}
          />
          <p className={classes.profileName}>Fabio Niglio</p>
          <div className={classes.iconContainer}>
            <a
              href="https://www.linkedin.com/in/fabioniglio/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={linkedinIcon}
                alt="Linkedin Icon"
                className={classes.icon}
              />
            </a>
            <a
              href="https://github.com/fabioniglio"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={githubIcon}
                alt="Github Icon"
                className={classes.icon}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
