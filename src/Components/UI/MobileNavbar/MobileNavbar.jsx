import * as React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import styles from "./MobileNavbar.module.scss";
import { navbarItems } from "utils/navbarItems";
import { CancelIcon, HamburgerMenu } from "helpers/Protected/icons";
import LanguageSelection from "../LanguageSelection/LanguageSelection";
import Modal from "../Modal/Modal";
import Login from "../Login/Login";
import Singup from "../Signup/SignUp";
import { t } from "i18next";
import { Link } from "react-scroll";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useModal } from "../useContextSignInSignUp/ModalOpenClose";

const MobileNavbar = () => {
  const {openLoginModal, openSignUpModal, closeLoginModal, closeSignUpModal,isLoginModalOpen, isSignUpModalOpen } = useModal()
  const [activeId, setActiveId] = useState(null);
  const [checkSighInUp, setcheckSighInUp] = useState(localStorage.getItem('JWT_Pay'));
  const [open, setOpen] = useState(false);
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
      setOpen(false);
    } else {
      setActiveId(to);
    }
  };

  const handleNavLinkClick = (path) => {
    if (!path.startsWith("#")) {
      setActiveId(null);
    }
    setOpen(false);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const list = () => (
    <Box
      sx={{
        width: "320px",
        display: "flex",
        gap: "50px",
        padding: "50px",
        background: "#00122A",
        height: "100%",
        position: "relative",
      }}
      role="presentation"
    >
      <div className={styles.cancelIcon} onClick={toggleDrawer(false)}>
        <CancelIcon fill="#fff" />
      </div>

      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          height: "100%",
          width: "100%",
        }}
      >
        <LanguageSelection />

        {navbarItems?.map((item) =>
          item.path.startsWith("#") ? (
            <Link
              to={item.path}
              spy={true}
              smooth={true}
              offset={-100}
              duration={300}
              state={item.state}
              key={item.path}
              onClick={() => handleSetActive(item.path)}
              activeClass={styles.active}
            >
              <ListItem key={item} disablePadding>
                <ListItemButton>
                  <ListItemText
                    primary={item.slug || ""}
                    sx={{
                      textAlign: "center",
                      textTransform: "capitalize",
                      fontSize: "20px",
                      fontWeight: "500",
                      letterSpacing: "2px",
                      lineHeight: "25px",
                      color: `#fff`,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ) : (
            <NavLink
              to={item.path}
              state={item.state}
              key={item.path}
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={() => handleNavLinkClick(item.path)}
            >
              <ListItem key={item} disablePadding>
                <ListItemButton>
                  <ListItemText
                    primary={item.slug || ""}
                    sx={{
                      textAlign: "center",
                      textTransform: "capitalize",
                      fontSize: "20px",
                      fontWeight: "500",
                      letterSpacing: "2px",
                      lineHeight: "25px",
                      color: "#fff",
                    }}
                    className="fontFamilyStyle"
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
          )
        )}

        {
          (!checkSighInUp) ?
            <div className={styles.registerButtons}>
              <Button
                onClick={openLoginModal}
                className={styles.registerbutton}
                variant="contained"
              >
                {t("Login")}
              </Button>
              <Button
                onClick={openSignUpModal}
                className={styles.registerbutton}
                variant="outlined"
              >
                {t("Signup")}
              </Button>
            </div>
            :
            ''
        }
      </List>
    </Box>
  );

  return (
    <>
      <div onClick={toggleDrawer(true)} className={styles.hamburger}>
        <HamburgerMenu fill={"#fff"} />
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        {list()}
      </Drawer>

      <Modal open={isLoginModalOpen} handleClose={closeLoginModal}>
        <Login
          setOpenModalLogin={openLoginModal}
          setOpenModalSignup={openSignUpModal}
        />
      </Modal>

      <Modal open={isSignUpModalOpen} handleClose={closeSignUpModal}>
        <Singup
          setOpenModalSignup={openSignUpModal}
          setOpenModalLogin={openLoginModal}
        />
      </Modal>
    </>
  );
};

export default MobileNavbar;
