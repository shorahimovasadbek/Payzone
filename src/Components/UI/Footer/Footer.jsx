import styles from "./Footer.module.scss";
import { NavLink } from "react-router-dom";
import { Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import { navbarItems } from "utils/navbarItems";
import logo from "../../assets/images/logo.png";
import { CopywritingIcon, EmailIcon, InstagramIcon, TelegramIcon, WhatsappIcon } from "helpers/Protected/icons";
import { useGetMedias } from "services/socials.service";

export function Footer() {
  const { t } = useTranslation("common");
  const { data: Socials } = useGetMedias();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.box}>
          <div className={styles.logo_email_wrapper}>
            <NavLink to="/">
              <div className={styles.logo_wrapper}>
                <img src={logo} alt="logo-payzone" />
              </div>
            </NavLink>

            <p className={styles.email}>
              <span><EmailIcon /></span>
              payzone.uz@gmail.com
            </p>
          </div>
          {/* <div>
            <a href="https://freekassa.com" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn.freekassa.com/banners/big-dark-1.png" title="Прием платежей на сайте"/>
            </a>
          </div> */}

          <div className={styles.pages}>
            <ul>
              <h2>{t("Havolalar")}</h2>
              {navbarItems?.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    state={item.state}
                  >
                    {t(item.slug)}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className={styles.social_medais_wrapper}>
              <h2>{t("Social Medias")}</h2>

              <div className={styles.icons} id="#contact">
                <NavLink to={'/'}><TelegramIcon /></NavLink>
                <NavLink to={'/'}><InstagramIcon /></NavLink>
                <NavLink to={'/'}><WhatsappIcon /></NavLink>
              </div>
            </div>

          </div>

        </div>

        <div className={styles.bottomFooter}>
          <p>
            <span><CopywritingIcon /></span>
            PayZone 2024
          </p>
        </div>
      </Container>
    </footer>
  );
}
