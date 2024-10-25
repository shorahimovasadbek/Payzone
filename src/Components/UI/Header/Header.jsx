import React, { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { SearchIcon, UserIcon } from "helpers/Protected/icons";
import { Button } from "@mui/material";
import Input from "../Input/Input";
import logo from "../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import Modal from "../Modal/Modal";
import Login from "../Login/Login";
import Singup from "../Signup/SignUp";
import MobileNavbar from "../MobileNavbar/MobileNavbar";
import VerifyOTP from "../VerifyOTP/VerifyOTP";
import LanguageSelection from "../LanguageSelection/LanguageSelection";
import notification from "../../assets/images/cart+counter.png"
import { useModal } from "../useContextSignInSignUp/ModalOpenClose";
import { useGetSearchAutofill } from "services/autofillSearch.service";
import { toast, ToastContainer } from "react-toastify";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Tooltip from '@mui/material/Tooltip';
import { useGetUcSearch } from "services/autofillUcSearch.service";



const Header = () => {
  const [isTrue, setIsTrue] = useState(localStorage.getItem('JWT_Pay') ? true : false);
  const { isSignUpModalOpen, isLoginModalOpen, closeLoginModal, closeSignUpModal, closeOTP, openLoginModal, openSignUpModal, openModalOTP } = useModal()
  const count = 2;

  const { t } = useTranslation("common");
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCheckSearch, setisCheckSearch] = useState(true)
  const [open, setOpen] = useState(false);
  const handleTooltipOpen = () => {
    setOpen(!open);
  };

  // const { data: getParamsSearch, isLoading, refetch } = useGetSearchAutofill(searchQuery);
  // const {data: getParamsUcSearch} = useGetUcSearch(searchQuery)

  const useCombinedSearch = (searchQuery) => {
    const { data: getParamsSearch, isLoading: loadingAutofill, refetch: refetchAutofill } = useGetSearchAutofill(searchQuery);
    const { data: getParamsUcSearch, isLoading: loadingUcSearch, refetch: refetchAutoUcFill } = useGetUcSearch(searchQuery);

    return {
      getParamsSearch,
      getParamsUcSearch,
      isLoading: loadingAutofill || loadingUcSearch,
      refetch: () => {
        refetchAutofill();
        refetchAutoUcFill()
      }
    };
  };
  const { getParamsSearch, getParamsUcSearch, isLoading, refetch } = useCombinedSearch(searchQuery);

  useEffect(() => {
    refetch()
    if (searchQuery.trim().length == 0) {
      setisCheckSearch(false)
    } else {
      setisCheckSearch(true)
    }
  }, [searchQuery]);

  const handleSuggestionClick = (suggestion) => {
    console.log(suggestion);
    
    setSearchQuery(suggestion)
    if (suggestion.endsWith('UC')) {
      navigate(`/search-answers-uc/${suggestion}`)
    } else {
      navigate(`/search-answers/${suggestion}`)
    }
    setisCheckSearch(false)
    setSearchQuery('')
  };

  const Search = () => {
    const endPont = searchQuery.trim()
    if (endPont) {
      navigate(`/search-answers/${endPont}`)
    } else {
      toast.error("Qidiruv maydoni bo'sh!", { autoClose: 2000 })
    }
  }

  const handleButtonClick = (event) => {
    event.preventDefault();
    Search();
  };


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      Search()
      setisCheckSearch(false)
    }
  };

  const isCheckedInput = () => {
    if (searchQuery.trim().length == 0) {
      setisCheckSearch(false)
    } else {
      setisCheckSearch(true)
    }
  }

  return (
    <>
      <div
        className={styles.navbar}
        data-aos="fade-down"
        data-aos-duration="2000"
      >
        <NavLink to="/">
          <div className={styles.logo_wrapper}>
            <img src={logo} alt="Payzone" />
          </div>
        </NavLink>

        <div className={styles.navbar_items}>
          <form className={styles.navbar_items_input}>
            <input
              type="text"
              // name="search"
              placeholder={t("search...")}
              onKeyDown={handleKeyDown}
              onClick={isCheckedInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
            />

            {getParamsSearch && getParamsSearch.data && isCheckSearch && (
              <ul style={{ backgroundColor: '#112939', color: '#fff', borderRadius: '20px', position: 'absolute', width: '400px', maxHeight: '50vh', overflowY: 'scroll' }}>
                {
                  getParamsSearch.data.map((item, index) => (
                    <li key={index} style={{ padding: '5px 10px', cursor: 'pointer' }} onClick={() => handleSuggestionClick(item.title)}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <img style={{ height: '70px', borderRadius: '10px' }} src={item.image_url} alt="game img" />
                        <div>
                          <h4>{item.title}</h4>
                          <p style={{ maxWidth: '250px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{item.description}</p>
                        </div>
                        <ArrowForwardIcon />
                      </div>
                    </li>
                  ))
                }

                {
                  getParamsUcSearch.data.map((item, index) => (
                    <li key={index} style={{ padding: '5px 10px', cursor: 'pointer' }} onClick={() => handleSuggestionClick(item.title)}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <img style={{ height: '70px', width: '50px', borderRadius: '10px', objectFit: 'contain' }} src={item.image_url} alt="game img" />
                        <div>
                          <h4>{item.title}</h4>
                        </div>
                        <ArrowForwardIcon />
                      </div>
                    </li>
                  ))
                }
              </ul>
            )}

            <button className={styles.SubmitButton} onClick={handleButtonClick}><SearchIcon /></button>
          </form>

          <div className={styles.navbar_items_wrapper}>
            <div className={styles.language}>
              <LanguageSelection />
            </div>

            <div className={styles.navbar_items_wrapper_buttons}>
              {!isTrue && (
                <div className={styles.registerButtons}>
                  <Button
                    onClick={openLoginModal}
                    variant="contained"
                    sx={{
                      borderRadius: "10px",
                      padding: "11px 26px 11px 26px",
                      textTransform: "capitalize",
                      fontFamily: "Orbitron",
                      fontSize: "16px",
                      fontWeight: "400",
                      lineHeight: "17.7px",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {t("Login")}
                  </Button>
                  <Button
                    onClick={openSignUpModal}
                    variant="outlined"
                    sx={{
                      borderRadius: "10px",
                      padding: "11px 26px 11px 26px",
                      textTransform: "capitalize",
                      fontFamily: "Orbitron",
                      fontSize: "16px",
                      fontWeight: "400",
                      lineHeight: "17.7px",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {t("Sign up")}
                  </Button>
                </div>
              )}

              {isTrue && (
                <div className={styles.navbar_items_wrapper_buttons_usersCard}>
                  <NavLink to={"/"}>
                    <div style={{
                      position: "relative",
                      cursor: "pointer",
                    }}>
                      <div className={styles.user_button1}>
                        <NotificationsNoneIcon onClick={handleTooltipOpen} />
                        <Tooltip
                          PopperProps={{
                            disablePortal: false,
                            sx: {
                              '& .MuiTooltip-tooltip': {
                                fontSize: '1.5rem',
                                padding: '10px 20px',
                                cursor: 'pointer',
                                height: '200px',
                                backgroundColor: '#112939',
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: '10px'
                              }
                            }
                          }}
                          open={open}
                          disableFocusListener
                          disableHoverListener
                          disableTouchListener
                          title={t('notification')}
                        >
                        </Tooltip>
                      </div>
                      {/* {count ? <div className={styles.count}>{count}</div> : ""} */}
                    </div>
                  </NavLink>

                  <NavLink to={"/profile"}>
                    <div className={styles.user_button}>
                      <UserIcon />
                    </div>
                  </NavLink>
                </div>
              )}

              <MobileNavbar />
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>

      <Modal open={isLoginModalOpen} handleClose={closeLoginModal}>
        <Login />
      </Modal>

      <Modal open={isSignUpModalOpen} handleClose={closeSignUpModal}>
        <Singup />
      </Modal>

      <Modal open={openModalOTP} handleClose={closeOTP}>
        <VerifyOTP />
      </Modal>
    </>
  );
};

export default Header;
