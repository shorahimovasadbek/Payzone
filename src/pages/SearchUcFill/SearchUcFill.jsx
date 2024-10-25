import React, { useState, useEffect } from "react";
import { Box, Button, Container, Grid } from "@mui/material";
import { t } from "i18next";
import SIngleCardGame from "Components/UI/SingleCardGame/SIngleCardGame";
import SingleCardPacks from "Components/UI/SingleCardPacks/SingleCardPacks";
import Modal from "Components/UI/Modal/Modal";
import { ClipLoader } from "react-spinners";
import {
    CancelIcon,
    Exclamation,
    Line,
} from "helpers/Protected/icons";
import img2 from "../../Components/assets/images/1.png";
import SingleCardOffer from "Components/UI/SingleCardOffer/SingleCardOffer";
import { useParams, useLocation } from "react-router-dom";
import { useGetAllProducts } from "services/games.service";
import { priceConvert } from "utils/priceConvert";
import PriceConvert from "Components/UI/PriceConverter/PriceConvert";
import MarqueeElem from "Components/UI/Marquee/Marquee";
import FAQ from "Components/UI/FAQ/FAQ";
import Login from "Components/UI/Login/Login";
import { useModal } from "Components/UI/useContextSignInSignUp/ModalOpenClose";
import { requestPayzone } from "services/http-client";
import { useMutation } from "react-query";
import { ToastContainer, toast } from 'react-toastify';
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import CloseIcon from '@mui/icons-material/Close'
import styles from './SearchUc.module.scss'
import { useGetUcSearch } from "services/autofillUcSearch.service";



const SearchUcFill = () => {
    // const data = fakedata();
    const { params } = useParams();
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const name = queryParams.get('name')

    const [openModal, setOpenModal] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState("uzs");
    const { openLoginModal } = useModal()

    const { data: allProducts, refetch } = useGetUcSearch(params);

    useEffect(() => {
        setTimeout(() => {
            refetch()
        }, 1000);
    }, [params])

    const OrderPosts = async (credentials) => {
        const response = await requestPayzone.post('/api/order/store', credentials);
        return response;
    };

    const mutation = useMutation(OrderPosts, {
        onSuccess: (data) => {
            toast.success("So'rov amalga oshirildi.",
                {
                    autoClose: 2000,
                    closeButton: <CloseIcon />,
                    style: {
                        backgroundColor: '#2B2734',
                        color: '#fff',
                        fontFamily: 'Montserrat',
                    }
                }
            );
            let m = '67062426e51de1c6a3a51913'
            let a = data.data.amount * 100
            let encoded = base64_encode(`ac.order_id=${data.data.id};m=${m};a=${a}`);
            window.location.href = `https://checkout.paycom.uz/${encoded}`
            setOpenModal(true)
        },
        onError: (error) => {
            if (error.status === 401) {
                // toast.error(error.data.message, { autoClose: 2000 });
                localStorage.removeItem('JWT_Pay')
                openLoginModal()
            } else {
                toast.error(error.data.message,
                    {
                        autoClose: 3000,
                        closeButton: <CloseIcon />,
                        style: {
                            backgroundColor: '#2B2734',
                            color: '#fff',
                            fontFamily: 'Montserrat',
                        }
                    }
                );
            }
        },
    });

    // const extractErrorMessage = (error) => {
    //   let firstError = [];
    //   if (error.data && error.data.message) {
    //     const errors = error.data.errors;
    //     Object.keys(errors).forEach((key) => {
    //       errors[key].forEach((message) => {
    //         firstError.push(message);
    //       });
    //     });
    //   }
    //   return firstError.join(' ');
    // };

    const handleClose = () => setOpenModal(false);
    const handleCheckSignInUp = (id, price) => {
        if (localStorage.getItem('JWT_Pay')) {
            mutation.mutate({
                product_id: id,
                amount: +(price)
            });
            setTimeout(() => {
                // setOpenModal(true)
            }, 3000);
        } else {
            openLoginModal()
        }
    }



    return (
        <div className={styles.singleGame}>
            <Container
                style={{ display: "flex", flexDirection: "column", paddingBottom: '70px', gap: '50px' }}
            >
                <div className={styles.nav_item}>
                    {/* <h1 className="title">PUBG Mobile UC</h1> */}
                    <h1 className="title">{name}</h1>
                    <p> </p>
                </div>
                <Grid container spacing={{ xs: 4, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {(allProducts && allProducts.data) ? allProducts.data?.map((service, index) => (
                        <Grid item xs={2} sm={6} md={3} key={index}>
                            <SIngleCardGame
                                key={index}
                                id={service.id}
                                title={service.title}
                                price={service.price}
                                img={service.image_url.replace(/\\/g, "")}
                                cardType='green'
                                handleCheckSignIn={() => handleCheckSignInUp(service.id, service.price)}
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

                {/* {service?.products?.map((item, index) => (
                <Grid item xs={12} sm={4} md={3} key={index}>
                  {item.card_type === "green" ? (
                    <SIngleCardGame
                      key={item.uuid}
                      id={item.uuid}
                      title={item.title}
                      price={priceConvert(item, "price_str", selectedCurrency)}
                      img={"http://payzone.uz/" + item.image?.slice(22)}
                      cardType={item.card_type}
                      openModal={openModal}
                      setOpenModal={setOpenModal}
                    />
                  ) : item.card_type === "big_green" ? (
                    <SingleCardPacks
                      key={item.id}
                      id={item.id}
                      count={item.count}
                      price={priceConvert(item, "price_str", selectedCurrency)}
                      img={"http://payzone.uz/" + item.image?.slice(22)}
                      setOpenModal={setOpenModal}
                    />
                  ) : item.card_type === "big_gold" ? (
                    <SingleCardOffer
                      key={item.id}
                      id={item.id}
                      count={item.count}
                      price={priceConvert(item, "price_str", selectedCurrency)}
                      img={"http://payzone.uz/" + item.image?.slice(22)}
                      setOpenModal={setOpenModal}
                    />
                  ) : (
                    ""
                  )}
                </Grid>
              ))} */}


                {/* <Box sx={{ flexGrow: 1 }}>
          <h1 className="title">{t("Minecraft Packs")}</h1>

          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {data?.root1.map((item, index) => (
              <Grid item xs={12} sm={4} md={3} key={index}>
                <SingleCardPacks
                  key={item.id}
                  id={item.id}
                  count={item.count}
                  price={item.price}
                  img={item.img}
                  setOpenModal={setOpenModal}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <h1 className="title">{t("Minecraft Packs")}</h1>

          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {data?.root1.map((item, index) => (
              <Grid item xs={12} sm={4} md={3} key={index}>
                <SingleCardOffer
                  key={item.id}
                  id={item.id}
                  count={item.count}
                  price={item.price}
                  img={item.img}
                  setOpenModal={setOpenModal}
                />
              </Grid>
            ))}
          </Grid>
        </Box> */}
                <ToastContainer />
            </Container>

            <MarqueeElem />
            <FAQ />

            <Modal open={openModal} handleClose={handleClose}>
                <div className={styles.login_wrapper}>
                    <h1 className={styles.title}>ID raqamingizni kiriting</h1>
                    <span
                        className={styles.cancelIcon}
                        onClick={() => setOpenModal(false)}
                    >
                        <CancelIcon />
                    </span>

                    <form action="">
                        <div className={styles.inputs}>
                            <div className={styles.input}>
                                <input type="text" placeholder="ID" />
                            </div>
                        </div>

                        <Button
                            variant="contained"
                            sx={{ borderRadius: "10px", fontSize: "20px" }}
                        >
                            {t("Qabul qilish")}
                        </Button>
                    </form>

                    <div className={styles.img_content}>
                        <span className={styles.line}>
                            <Line />
                        </span>
                        <div className={styles.guide}>
                            <Exclamation />
                            ID raqam profil qismida bo‘ladi
                        </div>
                        <div className={styles.img_wrapper}>
                            <img src={img2} alt="guide" />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default SearchUcFill;

