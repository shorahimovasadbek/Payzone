import React, { useState } from "react";
import styles from "./Steam.module.scss";
import { Box, Container, Grid } from "@mui/material";
import { t } from "i18next";
import SIngleCardGame from "Components/UI/SingleCardGame/SIngleCardGame";
import PriceConvert from "Components/UI/PriceConverter/PriceConvert";
import { useGetSteams } from "services/steams.service";
import { priceConvert } from "utils/priceConvert";
import { ClipLoader } from "react-spinners";

const Steam = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("uzs");

  const { data: SteamProducts } = useGetSteams();

  return (
    <div className={styles.steam}>
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <div className={styles.nav_item}>
            <h1 className="title">{t("PUBG Mobile UC")}</h1>

            {/* <PriceConvert
              selectedCurrency={selectedCurrency}
              setSelectedCurrency={setSelectedCurrency}
            /> */}
            <div></div>
          </div>

          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {(SteamProducts && SteamProducts.data) ? SteamProducts.data.map((item, index) => (
              <Grid item xs={2} sm={4} md={3} key={index}>
                <SIngleCardGame
                  key={item.uuid}
                  id={item.uuid}
                  title={item.title}
                  price={item.price_uz}
                  img={item.image_url}
                  cardType='green'
                />
              </Grid>
            ))
              :
              <div style={{ display: 'grid', height: '100%', margin: '0 auto', placeItems: 'center' }}>
                <ClipLoader
                  color="#fff"
                />
              </div>
            }
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Steam;
