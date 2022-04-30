import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <p id="footer-uni">Bulacan State University</p>
      <p id="footer-label">CONTACT US</p>
      <div className="footer-contact">
        <i
          className="fa fa-facebook fb-icon"
          style={{ fontSize: "1.25em" }}
        ></i>
        <a href="https://www.facebook.com/bulsuofficial">
          <p id="footer-fb">BULACAN STATE UNIVERSITY</p>
        </a>
        <br />
        <i
          className="fas fa-phone phone-icon"
          style={{ fontSize: "1.25em" }}
        ></i>
        <p id="footer-phone">919-7800</p>
        <br />
        <i
          className="fas fa-map-marker-alt loc-icon"
          style={{ fontSize: "1.25em" }}
        ></i>
        <p id="footer-loc">Guinhawa, City of Malolos, Bulacan</p>
        <br />
        <i
          className="fas fa-envelope email-icon"
          style={{ fontSize: "1.25em" }}
        ></i>
        <p id="footer-email">officeofthepresident@bulsu.edu.ph</p>
      </div>
      <p id="copyright-bulsu">2022 Bulacan State University</p>
    </div>
  );
};

export default Footer;
