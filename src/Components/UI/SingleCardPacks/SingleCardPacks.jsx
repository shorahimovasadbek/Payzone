import React from "react";
import styles from "./SingleCardPacks.module.scss";
import { Button } from "@mui/material";
import img from "../../assets/images/packs.png"
import { DoneIcon } from "helpers/Protected/icons";

const SingleCardPacks = ({setOpenModal}) => {
  return (
    <div className={styles.card}>
      <div className={styles.img_content}>
        <div className={styles.img_wrapper}>
          <img src={img} alt="game coin/uc/gold/diamonds" />
        </div>
        <div className={styles.content}>
          <p>
            <DoneIcon/>
            4 content packs
          </p>
          <p>
            <DoneIcon/>
            + 1200 coins
          </p>
        </div>
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

export default SingleCardPacks;
