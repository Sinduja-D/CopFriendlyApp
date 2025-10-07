import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>About Cop Friendly App</h1>
      <div className="about-content">
        <p>
          The Cop Friendly App is designed to strengthen the relationship between citizens and law enforcement agencies. 
          Our platform provides a seamless way for citizens to report crimes, send emergency alerts, and track the status of their complaints.
        </p>
        <p>
          For law enforcement, our app offers efficient tools to manage complaints, respond to emergencies, and analyze crime data to improve community safety.
        </p>
        <div className="mission">
          <h2>Our Mission</h2>
          <p>
            To create safer communities by fostering transparent communication and efficient collaboration between citizens and police.
          </p>
        </div>
        <div className="team">
          <h2>Development Team</h2>
          <p>This project was developed as a demonstration of modern web technologies for public safety applications.</p>
        </div>
      </div>
    </div>
  );
};

export default About;