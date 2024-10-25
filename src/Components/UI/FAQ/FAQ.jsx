import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import styles from "./FAQ.module.scss";
import { useTranslation } from "react-i18next";
import { FAQMinusIcon, FAQPlusIcon } from "helpers/Protected/icons";
import { useGetFaq } from "services/faq.service";
import { ClipLoader } from "react-spinners";

const FAQ = () => {
  const { t, i18n } = useTranslation("common");

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const { data: FAQ } = useGetFaq();

  return (
    <Container style={{ marginTop: "50px" }}>
      <h1 className="title" id="#" style={{ textAlign: "center" }}>
        {t("FAQ")}
      </h1>
      <div className={styles.wrapper}>
        <div className={styles.accordion}>
          {(FAQ && FAQ.data) ? FAQ.data.map((item, i) => (
            <Accordion
              key={i}
              expanded={expanded === `panel${i}`}
              onChange={handleChange(`panel${i}`)}
              sx={{
                padding: "10px",
                background: "none !important",
                borderWidth: "0 0 3px 0",
                borderStyle: " solid",
                borderImage:
                  "linear-gradient(90deg, rgba(255, 255, 255, 0) 1.04%, rgba(0, 212, 74, 0.6) 48.94%, rgba(255, 255, 255, 0) 100%)",
                borderImageSlice: "0 0 1 0",
                width: "100%",
              }}
            >
              <AccordionSummary
                expandIcon={
                  expanded === `panel${i}` ? <FAQMinusIcon /> : <FAQPlusIcon />
                }
                aria-controls={`panel${i}bh-content`}
                id={`panel${i}bh-header`}
                sx={{ display: "flex", gap: "20px" }}
              >
                <Typography
                  sx={{ width: "100%", flexShrink: 0, fontSize: "1.2rem" }}
                  className={styles.question}
                >
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  sx={{ fontSize: "19px" }}
                  className={styles.answer}
                >
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))
            :
            <div style={{ display: 'grid', height: '100%', margin: '0 auto', placeItems: 'center' }}>
              <ClipLoader
                color="#fff"
              />
            </div>
          }
        </div>
      </div>
    </Container>
  );
};

export default FAQ;
