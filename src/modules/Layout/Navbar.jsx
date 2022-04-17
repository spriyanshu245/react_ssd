import { Collapse } from "reactstrap";
import CustomLink from "./CustomLink";

export function Navbar(props) {
  return (
    <div className="topnav">
      <div className="container-fluid">
        <nav className="navbar navbar-light navbar-expand-lg topnav-menu" id="navigation">
          <Collapse isOpen={props.isOpen} id="top-navbar-menu" className="navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <CustomLink className="nav-link dropdown-toggle arrow-none d-flex align-items-center" to="/spv/list">
                  <i className="bx bx-menu me-2"></i>
                  List
                </CustomLink>
              </li>
              <li className="nav-item dropdown">
                <CustomLink className="nav-link dropdown-toggle arrow-none d-flex align-items-center" to="/spv/add">
                  <i className="bx bx-add-to-queue me-2"></i>
                  Create
                </CustomLink>
              </li>
              <li className="nav-item dropdown">
                <CustomLink className="nav-link dropdown-toggle arrow-none d-flex align-items-center" to="/spv/investors">
                  <i className="bx bxs-user-detail me-2"></i>
                  SPV Investors
                </CustomLink>
              </li>
              <li className="nav-item dropdown">
                <CustomLink className="nav-link dropdown-toggle arrow-none d-flex align-items-center" to="/spv/invitedInvestors">
                  <i className="bx bxs-user-plus me-2"></i>
                  Invite Investors
                </CustomLink>
              </li>
            </ul>
          </Collapse>
        </nav>
      </div>
    </div>
  );
}
