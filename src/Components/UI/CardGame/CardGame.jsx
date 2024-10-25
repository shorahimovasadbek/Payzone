import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./CardGame.module.scss";
import { BuyRowIcon } from "helpers/Protected/icons";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const  CardGame = ({ name, image, id, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  const {t}=useTranslation("common"); 


  return (
      <div className={styles.card} >
        <div className={styles.card_wrapper}>
          <div className={styles.img_wrapper}>
            <img src={image} alt="card-game" />
          </div>

          <div className={styles.card_content}>
            <h1>{name}</h1>
            <p>{description}</p>
            <Link
              to={`/single-game/${id}?name=${name}`}
              className={styles.project_button}
            >
              <Button
                variant="contained"
                className={styles.btn}
                fullWidth={false}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {t("buy")}
                <span>
                  <BuyRowIcon fill={isHovered ? "#00d44a" : "#102838"} />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
  );
};

export default CardGame;
