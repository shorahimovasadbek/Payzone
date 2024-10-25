import { LanguageRowIcon } from "helpers/Protected/icons";
import React, { createContext,useContext, useState } from "react";
import styles from "./LanguageSelection.module.scss"
import { useTranslation } from "react-i18next";

const LanguageContext = createContext()

const LanguageSelection = () => {

  const {i18n } = useTranslation("common");
  const langs = [
    {
      label: "ru",
    },
    {
      label: "uz",
    },
    {
      label: "en",
    },
  ];

  const handleChangeLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('Lang_Pay', lang)
    window.location.reload()
  };

  return (
    <div className={styles.navbar_items_wrapper}>
      <div className={styles.header_navbar_utils_langs}>
        <li className={styles.item}>
          <div className={styles.item_wrapper}>
            <span>{i18n.language}</span>
            <span className={styles.iconrow}>
              <LanguageRowIcon fill={"#fff"}/>
            </span>
          </div>
          <div className={styles.childList}>
            <ul>
              {langs.map((lang) => (
                <li
                  key={lang?.label}
                  className={styles.childItems}
                  onClick={() => handleChangeLang(lang.label)}
                >
                  <>
                    <a>{lang.label} </a>
                  </>
                </li>
              ))}
            </ul>
          </div>
        </li>
      </div>
    </div>
  );
};

export default LanguageSelection;
