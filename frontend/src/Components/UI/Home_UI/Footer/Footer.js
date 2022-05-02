import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <p id="footer-uni">Bulacan State University</p>
      <p id="footer-label">CONTACT US</p>
      <div className="footer-contact">
        <span className="contact">
          <i
            className="fa fa-facebook fb-icon"
            style={{ fontSize: "1.25em" }}
          ></i>
          <a className="contact-space" href="https://www.facebook.com/bulsuofficial">
            <p id="footer-fb">BULACAN STATE UNIVERSITY</p>
          </a>
        </span>
        <span className="contact">
          <i
            className="fas fa-phone phone-icon"
            style={{ fontSize: "1.25em" }}
          ></i>
          <p className="contact-space" id="footer-phone">919-7800</p>
        </span>
        <span className="contact">
          <i
            className="fas fa-map-marker-alt loc-icon"
            style={{ fontSize: "1.25em" }}
          ></i>
          <p className="contact-space" id="footer-loc">Guinhawa, City of Malolos, Bulacan</p>
        </span>
        <span className="contact">
          <i
            className="fas fa-envelope email-icon"
            style={{ fontSize: "1.25em" }}
          ></i>
          <p className="contact-space" id="footer-email">officeofthepresident@bulsu.edu.ph</p>
        </span>
      </div>
      <p id="copyright-bulsu">2022 Bulacan State University</p>
    </div>
  );
};

export default Footer;
