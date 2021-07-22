import React, { useEffect, handleShow, useState } from "react";
import "./Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);

  // 스크롤 감지
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      var clickfn = function () {};
      window.removeEventListener("scroll", clickfn);
    };
  }, []);
  function refreshPage() {
    window.location.reload();
  }
  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        className="nav__logo"
        onClick={() => refreshPage()}
        //src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Logo_Netflix.png"
        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
        alt="Netflix Logo"
      />
      <img
        className="nav__avatar"
        //src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
        src="https://avatars.githubusercontent.com/u/29592260?v=4"
        alt="Netflix Logo"
      />
    </div>
  );
}

export default Nav;
