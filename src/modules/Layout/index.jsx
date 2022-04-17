import { Header } from "./Header";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useAuth } from "../App/AuthProvider";
import { useState } from "react";

export function Layout(props) {
  let auth = useAuth();

const [isMenuOpened, setIsMenuOpened] = useState(false);
const openMenu = () => {
  setIsMenuOpened(!isMenuOpened);
};

  return (
    <div id="layout-wrapper">
      <Header openMenuCallBack={openMenu} isOpen={isMenuOpened} />

      {auth.user && <Navbar isOpen={isMenuOpened} />}

      <div className="main-content">
        <div className="page-content">{props.children}</div>
      </div>

      <Footer />
    </div>
  );
}
