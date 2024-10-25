import React, { useState } from "react";
import styles from "./PaymentCard.module.scss";
import "react-credit-cards/es/styles-compiled.css";
import { useTranslation } from "react-i18next";
import { CancelIcon, PlusIcon } from "helpers/Protected/icons";
import { Button, Checkbox, Grid } from "@mui/material";
import Cards from "react-credit-cards";

import paymentCArd1 from "../../assets/images/HUMO.png";
import paymentCArd2 from "../../assets/images/visa.png";
import paymentCArd3 from "../../assets/images/MASTERCARD.png";
import paymentCArd4 from "../../assets/images/UZCARD.png";
import paymentCArd5 from "../../assets/images/payment.png";
import Modal from "../Modal/Modal";

const paymentcards = [
  { id: 1, value: "visa", img: paymentCArd1 },
  { id: 1, value: "visa", img: paymentCArd2 },
  { id: 1, value: "visa", img: paymentCArd3 },
  { id: 1, value: "visa", img: paymentCArd4 },
  { id: 1, value: "visa", img: paymentCArd5 },
];

const PaymentCard = () => {
  const { t } = useTranslation("common");
  const [openAddCardModal, setOpenAddCardModal] = useState(false);
  // const [state, setState] = useState({
  //   number: "",
  //   expiry: "",
  //   cvc: "",
  //   name: "",
  //   focus: "",
  // });

  const handleClose = () => {
    setOpenAddCardModal(false);
  };

  return (
    <>
      <div className={styles.payment_card}>
        <h1 className={styles.title}>{t("My payment methods")}</h1>
        <div className={styles.card_wrapper}>
          <Cards
            number={"0000 0000 0000 0000"}
            name={"Javlon"}
            expiry={"01/27"}
            cvc={"125"}
          />
          <div
            className={styles.add_card}
            onClick={() => setOpenAddCardModal(true)}
          >
            <PlusIcon />
          </div>
        </div>
      </div>

      <Modal open={openAddCardModal} handleClose={handleClose}>
        <div className={styles.cards_wrapper}>
          <h1 className={styles.title}>{t("Add Payment Method")}</h1>
          <span className={styles.cancelIcon} onClick={handleClose}>
            <CancelIcon />
          </span>

          <form action="">
            <div className={styles.inputs}>
              <div className={styles.payment_type}>
                <h1 className={styles.payment_type_title}>
                  {t("Choose payment type")}
                </h1>

                <div className={styles.payment_type_cards}>
                  <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {paymentcards?.map((item) => (
                      <Grid item xs={2} md={6}>
                        <div className={styles.radioInputs}>
                          <input
                            type="radio"
                            id={item.value}
                            name="card"
                            value={item.value}
                          />
                          <label for={item.value}>
                            <img src={item.img} alt="card_img" />
                          </label>
                        </div>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              </div>

              <div className={styles.input}>
                <label>{t("Card Number")}</label>
                <input type="number" placeholder="Enter your card number" />
              </div>

              <div className={`${styles.input} ${styles.input2}`}>
                <div className={styles.input2_input}>
                  <label for="expiry">{t("Expiration Date")} </label>
                  <input
                    type="text"
                    id="expiry"
                    name="expiry"
                    placeholder="MM/YY"
                    pattern="^(0[1-9]|1[0-2])\/?([0-9]{2})$"
                    required
                  />
                </div>
                <div className={styles.input2_input}>
                  <label>{t("CVV")} </label>
                  <input type="number" placeholder="xxx" />
                </div>
              </div>

              <div className={styles.input}>
                <label>{t("Name of Card")}</label>
                <input type="text" placeholder="Enter name of the card" />
              </div>

              {/* <div className={styles.input}>
                <label>{t("Name of Card")}</label>
                <input type="text" placeholder="Enter name of the card" />
              </div> */}

              <div className={styles.agreement}>
                <Checkbox
                  sx={{
                    color: "#00d44a",
                    "&.Mui-checked": {
                      color: "#00d44a",
                    },
                  }}
                />
                <p>{t("Remember this card")}</p>
              </div>
            </div>

            <Button
              variant="contained"
              fullWidth={true}
              sx={{ borderRadius: "10px", fontSize: "20px" }}
            >
              {t("Add this payment")}
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default PaymentCard;
