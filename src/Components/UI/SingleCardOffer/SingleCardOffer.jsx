import React from "react";
import styles from "./index.module.scss";
import img from "../../assets/images/offer.png"
import { Button } from "@mui/material";
import { t } from "i18next";

const SingleCardOffer = ({ setOpenModal }) => {
  return (
    <div className={styles.card}>
      <div className={styles.img_content}>
        <div className={styles.img_wrapper}>
          <img src={img} alt="game coin/uc/gold/diamonds" />
        </div>
        <h3 className={styles.coin}>{t("Clash Games Staduim")}</h3>
      </div>
      <Button
        variant="contained"
        className={styles.btn}
        fullWidth={false}
        onClick={() => setOpenModal(true)}
      >
        13,000 so’m
      </Button>
    </div>
  );
};

export default SingleCardOffer;
