import React, { useState, useEffect } from "react";
import styles from "./NavbarAssistens.module.scss";
import { navbarItems } from "utils/navbarItems";
import { Link } from "react-scroll";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const NavbarAssistens = () => {
  const [activeId, setActiveId] = useState(null);
  const { t } = useTranslation("common");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/steam") {
      setActiveId(null);
    }
  }, [location]);

  const handleSetActive = (to) => {
    if (location.pathname === "/steam" && to.startsWith("#")) {
      navigate("/");
    } else {
      setActiveId(to);
    }
  };

  const handleNavLinkClick = (path) => {
    if (!path.startsWith("#")) {
      setActiveId(null);
    }
  };

  return (
    <>
      <nav className={styles.navbar} data-aos="fade-down" data-aos-duration="3000">
        <ul>
          {navbarItems?.map((item) => (
            item.path.startsWith("#") ? (
              <Link
                to={item.path}
                spy={true}
                smooth={true}
                offset={-200}
                duration={300}
                state={item.state}
                key={item.path}
                onSetActive={handleSetActive}
                onClick={()=>handleSetActive(item.path)}
                activeClass={styles.active}
                className={`${item.path === activeId  ? styles.active : ""}`}
              >
                <li>{t(item.slug)}</li>
              </Link>              
            ) : (
              <NavLink
                to={item.path}
                state={item.state}
                key={item.path}
                className={({ isActive }) =>
                  isActive ? styles.active : ""
                }
                onClick={() => handleNavLinkClick(item.path)}
              >
                <li>{t(item.slug)}</li>
              </NavLink>
            )
          ))}
        </ul>
      </nav>
    </>
  );
};

export default NavbarAssistens;
