import React, { useEffect } from 'react'
import styles from "./Price.module.scss"
import { LanguageRowIcon, PriceIcon } from 'helpers/Protected/icons'

const price = [
    {
      label: "uzs",
    },
    {
      label: "usd",
    },
    {
      label: "rub",
    },
  ];

const PriceConvert = ({selectedCurrency, setSelectedCurrency}) => {

  useEffect(() => {
    const savedCurrency = localStorage.getItem("selectedCurrency");
    if (savedCurrency) {
      setSelectedCurrency(savedCurrency);
    }
  }, []);

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    localStorage.setItem("selectedCurrency", currency);
  };

  return (
    <div className={styles.header_navbar_utils_langs}>
    <li className={styles.item}>
      <div className={styles.item_wrapper}>
        <span className={styles.iconrow}>
          <PriceIcon />
        </span>
        <span>{selectedCurrency}</span>
        <span className={styles.iconrow}>
          <LanguageRowIcon />
        </span>
      </div>
      <div className={styles.childList}>
        <ul>
          {price.map((option) => (
            <li
              key={option?.label}
              className={styles.childItems}
              onClick={() => handleCurrencyChange(option.label)}
            >
              <>
                <a>{option.label} </a>
              </>
            </li>
          ))}
        </ul>
      </div>
    </li>
  </div>
  )
}

export default PriceConvert