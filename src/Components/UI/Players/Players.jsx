import React from "react";
import { Button, Container, useMediaQuery } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "./Players.module.scss";
import gamerImage from "../../assets/images/gamerimg.png";
import { FirstPlaceIcon, PaymentIcon, SecondPlaceIcon, ThirdPlaceIcon } from "helpers/Protected/icons";
import { useTranslation } from "react-i18next";

function createData(id, gamers, payment, game) {
  return { id, gamers, payment, game };
}

const rows = [
  createData(1231, "Frozen yoghurt", 1000000, 6.0),
  createData(1231, "Ice cream sandwich", 237, 9.0),
  createData(1231, "Eclair", 262, 16.0),
  createData(1231, "Cupcake", 305, 3.7),
  createData(1231, "Gingerbread", 356, 16.0),
];

const Players = () => {
  const width700 = useMediaQuery("(max-width: 700px)");
  const {t}=useTranslation("common");
  return (
    <Container>
      <div className={styles.players}>
        <div className={styles.buttons}>
          <p>{t("Eng so’nggi")}</p>

          <div className={styles.btn}>
            <Button variant="contained" sx={{padding:"10px 20px", borderRadius:"10px"}}>
              <div className={styles.btn_content}>{t("top players")}</div>
            </Button>
          </div>
        </div>

        <div className={styles.players_wrapper}>
          <TableContainer component={Paper}>
            <Table style={{backgroundColor: '#03182a'}} sx={width700 ? { maxWidth: 650 } : {minWidth: 650}} aria-label="simple table">
              <TableHead>
                <TableRow className={styles.tablerow}>
                  <TableCell className={styles.tablerow_content}>
                    {t("gamers")}
                  </TableCell>
                  <TableCell className={styles.tablerow_content} align="left">
                    {t("payment")}
                  </TableCell>
                  <TableCell className={styles.tablerow_content} align="left">
                    {t("game")}
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    key={row.gamers}
                    sx={{
                      "&:firs-child td, &:second-child th": { border: "1px solid red" },                      
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                        position: "relative",
                      }}
                      className={
                        index === 0
                          ? "firstRow"
                          : index === 1
                          ? "secondRow"
                          : index === 2
                          ? "thirdRow"
                          : ""
                      }
                    >
                      <span className={styles.place}>
                        {index === 0 ? (
                          <FirstPlaceIcon />
                        ) : index === 1 ? (
                          <SecondPlaceIcon />
                        ) : index === 2 ? (
                          <ThirdPlaceIcon />
                        ) : null}
                      </span>
                      <span className={styles.img_wrapper}>
                        <img src={gamerImage} alt="gamer-payzone" />
                      </span>
                      <div className={styles.gamerName}>
                        <h1>{row.gamers}</h1>
                        <span>{`#${row.id}`}</span>
                      </div>
                    </TableCell>
                    <TableCell align="right" sx={{}}>
                      <span className={styles.payment}>
                        {" "}
                        <PaymentIcon /> {row.payment}
                      </span>
                    </TableCell>
                    <TableCell align="right">
                      <span className={styles.img_wrapper}>
                        <img src={gamerImage} alt="gamer-payzone" />
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </Container>
  );
};

export default Players;
