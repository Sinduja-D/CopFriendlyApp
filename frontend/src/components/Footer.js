import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Cop Friendly App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;