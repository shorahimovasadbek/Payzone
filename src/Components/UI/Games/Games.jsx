import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardGame from "../CardGame/CardGame";
import { Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGetGames } from "services/games.service";
import { ClipLoader } from "react-spinners";
import pubg from '../../assets/images/pubg.png'
import Pubg from '../../assets/images/image 10.png'
import Clash from '../../assets/images/clash-of-clans-chaotic-batltefield-f88iyeweabo3r6kz 1.png'
import Mobile from '../../assets/images/image_2024-07-15_12-43-04 1.png'
import PubgNew from '../../assets/images/image 15.png'
import Minecraft from '../../assets/images/minecraft-character--more-crystals (1) 1.png'
import Among from '../../assets/images/image 12.png'
import WorldOfTanks from '../../assets/images/world-of-tanks-blasting-j0wj011hu1wt08wc 1.png'
import GTA from '../../assets/images/gta-v--a-bandit-wearing-a-rabbit-mask 1.png'
import Brawl from '../../assets/images/brawl-stars-poster-gkfzjpvuf1h0ypyi.png'
import FreeFire from '../../assets/images/happymod-in-free-fire-2020-u8u4v2z9u6ij6iw9 1.png'
import WorldWarShip from '../../assets/images/wallpaperflare.com_wallpaper 1.png'
import notFound from '../../assets/images/Image-not-found.png'

const Games = (dataSearch) => {
  const { t } = useTranslation("common");
  const { data: Games } = useGetGames();
  const massiv = [
    {
      src: pubg
    },
    {
      src: Pubg
    },
    {
      src: Clash
    },
    {
      src: Mobile
    },
    {
      src: PubgNew
    },
    {
      src: Minecraft
    },
    {
      src: Among
    },
    {
      src: WorldOfTanks
    },
    {
      src: GTA
    },
    {
      src: Brawl
    },
    {
      src: FreeFire
    },
    {
      src: WorldWarShip
    }
  ]

  const getDuration = (index) => 1000 + index * 200;
  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <h1
          className="title"
          id="#games"
          style={{ textAlign: "center" }}
          data-aos="fade-down"
          data-aos-duration="3000"
        >
          {t("Games")}
        </h1>

        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {(Games && Games.data) ? Games.data.map((item, index) => (
            <Grid
              item
              xs={2}
              sm={4}
              md={3}
              key={index}
              data-aos="fade-right"
              data-aos-duration={getDuration(index)}
            >
              <CardGame
                key={index}
                id={item.id}
                description={item.description}
                name={item.title}
                image={(item.image_url) ? item.image_url : notFound}
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
  );
};

export default Games;
