import React, { useState } from 'react'
import styles from "./Payment.module.scss"


import img2 from "../../assets/images/ucprofile.png";
import { useTranslation } from 'react-i18next';
import { ProfileTabelRow } from 'helpers/Protected/icons';
const data = [
    {
      game: "Pubg Mobile",
      product: img2,
      quantity: 1900,
      price: "12,500",
      date: "13 August 2024",
      card: "1234 5678 9000 0000",
    },
    {
      game: "Pubg Mobile",
      product: img2,
      quantity: 1900,
      price: "12,500",
      date: "13 August 2024",
      card: "1234 5678 9000 0000",
    },
    {
      game: "Pubg Mobile",
      product: img2,
      quantity: 1900,
      price: "12,500",
      date: "13 August 2024",
      card: "1234 5678 9000 0000",
    },
    {
      game: "Pubg Mobile",
      product: img2,
      quantity: 1900,
      price: "12,500",
      date: "13 August 2024",
      card: "1234 5678 9000 0000",
    },
    {
      game: "Pubg Mobile",
      product: img2,
      quantity: 1900,
      price: "12,500",
      date: "13 August 2024",
      card: "1234 5678 9000 0000",
    },
    {
      game: "Pubg Mobile",
      product: img2,
      quantity: 1900,
      price: "12,500",
      date: "13 August 2024",
      card: "1234 5678 9000 0000",
    },
    {
      game: "Pubg Mobile",
      product: img2,
      quantity: 1900,
      price: "12,500",
      date: "13 August 2024",
      card: "1234 5678 9000 0000",
    },
    {
      game: "Pubg Mobile",
      product: img2,
      quantity: 1900,
      price: "12,500",
      date: "13 August 2024",
      card: "1234 5678 9000 0000",
    },
    {
      game: "Pubg Mobile",
      product: img2,
      quantity: 1900,
      price: "12,500",
      date: "13 August 2024",
      card: "1234 5678 9000 0000",
    },
    {
      game: "Pubg Mobile",
      product: img2,
      quantity: 1900,
      price: "12,500",
      date: "13 August 2024",
      card: "1234 5678 9000 0000",
    },
  ];


const Payments = () => {
  const { t } = useTranslation("common");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <>
         <div className={styles.payments}>
                <h1 style={{ textAlign: "center" }}>{t("My payments")}</h1>

                <table className={styles.table}>
                  <tr className={styles.tableHeader}>
                    <th>Game</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Date</th>
                    <th>Card</th>
                  </tr>

                  {data?.map((item, index) => (
                    <tr
                      key={index}
                      className={styles.tableBody}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <td>{item.game}</td>
                      <td>
                        <div className={styles.product_img}>
                          <img src={item.product} alt="product" />
                        </div>
                      </td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                      <td>{item.date}</td>
                      <td
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p>{item.card}</p>
                        <div className={styles.icon}>
                          <ProfileTabelRow
                            fill={hoveredIndex === index ? "#00d44a" : "#fff"}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
    </>
  )
}

export default Payments