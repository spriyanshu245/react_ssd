import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../App/AuthProvider";
import CustomLink from "./CustomLink";

import user1 from "../../assets/images/users/avatar-1.jpg";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { useState } from "react";

export function Header(props) {
  let auth = useAuth();
  let navigate = useNavigate();

  const [menu, setMenu] = useState(false);

  return (
    <header id="page-topbar">
      <div className="navbar-header">
        <div className="d-flex">
          <div className="navbar-brand-box">
            <Link to="" className="logo logo-dark">
              <img src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} alt="SPV Hub" height="40" />
            </Link>
          </div>

          <button
            className="btn btn-sm px-3 font-size-16 d-lg-none header-item"
            data-toggle="collapse"
            onClick={() => {
              props.openMenuCallBack(!!props.isOpen);
            }}
            data-target="#top-navbar-menu"
          >
            <i className="fa fa-fw fa-bars"></i>
          </button>
        </div>

        {auth.user && (
          <Dropdown isOpen={menu} toggle={() => setMenu(!menu)} className="d-inline-block">
            <DropdownToggle className="btn header-item" id="page-header-user-dropdown" tag="button">
              <img className="rounded-circle header-profile-user" src={user1} alt="Header Avatar" />
              <span className="d-none d-xl-inline-block ms-2 me-1">
                {auth.user?.name}
                <br />({auth.user?.role})
              </span>
              <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              {/* <DropdownItem tag="a" href="/profile">
                <i className="bx bx-user font-size-16 align-middle me-1" />
                My Profile
              </DropdownItem>
              <div className="dropdown-divider" /> */}
              <DropdownItem className="dropdown-item" onClick={logout}>
                <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
                Logout
              </DropdownItem>
              <DropdownItem className="dropdown-item">
                <CustomLink to="/changePassword">
                  <i className="bx bx-key font-size-16 align-middle me-1" />
                  Change Password
                </CustomLink>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
    </header>
  );

  function logout() {
    auth.setUser();
    navigate("/login", { replace: true });
  }
}
