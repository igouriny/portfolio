import profilePic from "./assets/profile_placeholder.png";
import github from "./assets/github.png";
import linkedin from "./assets/linkedin.png";

function Navbar({ setActiveSection }) {
  return (
    <header>
      <img className="profile" src={profilePic} alt="profile picture" />
      <ul className="main-nav">
        <li className="about" onClick={() => setActiveSection('about')}>
          About
        </li>
        <li className="academic" onClick={() => setActiveSection('academic')}>
          Academic
        </li>
        <li className="contact" onClick={() => setActiveSection('contact')}>
          Contact
        </li>
      </ul>
      <div className="bottom-header">
        <ul className="bottom-nav">
          <li className="bottom-nav-list">
            <a href="https://github.com/igouriny" target="_blank">
              <img src={github} alt="github" className="github" />
            </a>
          </li>
          <li className="bottom-nav-list">
            <a href="https://www.linkedin.com/in/ilyass-gouriny-7463b2235/" target="_blank">
              <img src={linkedin} alt="linkedin" className="linkedin" />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
