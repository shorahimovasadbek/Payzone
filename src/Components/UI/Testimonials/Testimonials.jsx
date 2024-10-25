import React from "react";
import { useMediaQuery } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Testimonials.module.scss";
import { styled } from "@mui/material/styles";
import { Rating } from "@mui/material";
// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { MarkedIcon } from "helpers/Protected/icons";
import { useTranslation } from "react-i18next";
import { useGetFeedbacks } from "services/testimonials.service";
import { ClipLoader } from "react-spinners";
import userImg from '../../assets/images/profile.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const StyledRating = styled(Rating)({
  "&.MuiRating-root": {
    display: "flex",
  },
});


const Testimonials = () => {
  const { t } = useTranslation("common");
  const width1000px = useMediaQuery("max-width:1000px");
  const { data: feedbacks } = useGetFeedbacks();
  // console.log(feedbacks.data, 'bu feeeeedbaskcs');

  return (
    <>
      <div
        id="#about"
        className={styles.wrapper}
      >
        <h1 style={{ textAlign: "center", width: "327px" }} className="title">
          {t("reviews")}
        </h1>

        <Swiper
          slidesPerView={width1000px ? 1 : 1.5}
          centeredSlides={true}
          spaceBetween={30}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          loop={true}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          {(feedbacks && feedbacks.data) ? feedbacks.data?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className={styles.review}>
                <div className={styles.markedIcon}>
                  <span>
                    <MarkedIcon />
                  </span>
                  <span>
                    <MarkedIcon />
                  </span>
                </div>

                <div className={styles.review_content}>
                  <StyledRating
                    name="read-only"
                    max={5}
                    value={item.rating}
                    readOnly
                  />
                  <p className={styles.review_content_text}>{item.comment}</p>

                  <div className={styles.reviewer_wrapper}>
                    <div className={styles.img_wrapper}>
                      {/* <img src={item.user.img ? item.user.img : <AccountCircleIcon/>} alt="reviewer_image" /> */}
                      <AccountCircleIcon
                        style={{color: '00122a', fontSize: '50px'}}
                      />
                      <div className={styles.name_position}>
                        <h1>{item.user.name}</h1>
                        <h2>{item.user.email}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
            :
            <div style={{ display: 'grid', height: '100%', margin: '0 auto', placeItems: 'center' }}>
              <ClipLoader
                color="#fff"
              />
            </div>
          }
        </Swiper>
      </div>
    </>
  );
};

export default Testimonials;
