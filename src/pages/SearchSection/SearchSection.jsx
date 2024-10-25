import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardGame from "../../Components/UI/CardGame/CardGame";
import { Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ClipLoader } from "react-spinners";
import { useParams } from 'react-router-dom'
import style from './SearchGame.module.scss'
import { useGetSearch } from 'services/search.service'
import notFound from '../../Components/assets/images/Image-not-found.png'

export const SearchSection = () => {
    const { t } = useTranslation("common");
    const { params } = useParams()
    
    const { data: SearchProducts, refetch} = useGetSearch(params)

    useEffect(() => {
        refetch()
    }, [params])
    const getDuration = (index) => 1000 + index * 200;
    
    return (
        <div className={style.wrapper}>
            {
                (SearchProducts && SearchProducts.data.length>0) ?

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
                                {(SearchProducts && SearchProducts.data) ? SearchProducts.data.map((item, index) => (
                                    <Grid
                                        item
                                        xs={12}
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
                                            // image={ "http://payzone.uz/" + item.image?.slice(22)}
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

                    :

                    <h1 style={{textAlign : 'center'}}>Not found</h1>
            }
        </div>
    )
}


