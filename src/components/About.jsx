import "./About.css";

function About() {
  return (
    <div className="contentAbout">
      <div className="appDetails">
        <div className="appText">
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
      <div className="About">
        <div className="Profile">
          <div className="profile-circle"></div>
          <p>Fabio Niglio</p>
        </div>
        <div className="Profile">
          <div className="profile-circle"></div>
          <p>Fabio Niglio</p>
        </div>
      </div>
    </div>
  );
}

export default About;
