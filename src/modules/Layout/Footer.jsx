import { Container } from "reactstrap";

export function Footer() {
  return (
    <footer className="footer">
      <Container>
        <div className="container text-center">
          <p>
            Copyright © {new Date().getFullYear()} Powered by {" "}
            <a className="copyright-text" href="https://www.startupsteroid.com/" rel="noreferrer" target="_blank">
              Startup Steroid
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
