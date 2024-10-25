import React from "react";
import styles from "./SIngleCardGame.module.scss";
import { Button } from "@mui/material";
import rpimage from "../../assets/images/rp.png";

const SIngleCardGame = ({ title, img, cardType, handleCheckSignIn, price }) => {
  let hello = new Intl.NumberFormat('uz-UZ', {
    style: 'decimal',
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    currency: undefined
  }).format(price).replace(/,/g, '.')


  return (
    <>
      <div className={cardType === "green" ? styles.card : styles.gold}>
        {/* {cardType === "gold" ? (
          <span>
            <img src={rpimage} alt="rp" />
          </span>
        ) : (
          ""
        )} */}
        <div className={styles.img_content}>
          <div className={styles.img_wrapper}>
            <img src={img} alt="game coin/uc/gold/diamonds" />
          </div>
          <h3 className={styles.coin}>{title}</h3>
        </div>
        <Button
          variant="contained"
          className={styles.btn}
          fullWidth={false}
          onClick={handleCheckSignIn}
        >
          {hello}
        </Button>
      </div>
    </>
  );
};

export default SIngleCardGame;
