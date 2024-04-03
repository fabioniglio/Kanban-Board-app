import classes from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={classes.container}>
      <a
        href="https://github.com/fabioniglio/Kanban-Board-app"
        className={classes.link}
      >
        GitHub
      </a>
    </div>
  );
};

export default Footer;
