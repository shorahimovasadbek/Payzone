import React from "react";
import styles from "./Advertisement.module.scss";
import { Button, Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGetEvents } from "services/events.service";
import { translate } from "utils/translate";
import image from '../../assets/images/pubg.png'

const Advertisement = () => {
  const { i18n } = useTranslation("common");
  const { t } = useTranslation("common");
  // const { data: Events } = useGetEvents();

  return (
    <Container>
      <div className={styles.wrapper} id="#payzone">
        <div className={styles.content}>
          <div className={styles.img_wrapper}>
            <div className={styles.gradient}></div>
            <img src={image} alt="intro_pubg_gaming" />
          </div>

          <div className={styles.content_infos}>
            <h1>
              {t(`Sizda ham Kundalik`)} <br />
              <span>{t(`Muvaffaqiyat`)}</span> <br />
              {t(`G'oliblar qatorida bo'ling`)}
            </h1>

            <p>5 daqiqadan kamroq vaqt ichida boshlang - kredit karta kerak emas! Ro‘yxatdan o‘ting va o’yin tajribangizni ilg‘or tranzaksiyalar bilan o‘zgartiring</p>
            <div className={styles.btn}>
              <Button
                variant="outlined"
                sx={{ border: "2px solid", borderRadius: "10px" }}
              >
                <div className={styles.btn_content}>O'ynash</div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Advertisement;
