import React, { useEffect, useState } from "react";
import styles from "./profile.module.scss";
import image from "../../assets/images/profile.png";
import { CancelIcon, ChangeIconButton } from "helpers/Protected/icons";
import { useTranslation } from "react-i18next";
import Modal from "../Modal/Modal";
import { Button, Grid } from "@mui/material";
import dayjs from "dayjs";
import PhoneInput from "react-phone-number-input";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller, useForm } from "react-hook-form";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useMutation } from 'react-query';
import { requestPayzone } from "services/http-client";
import { toast } from "react-toastify";
import CloseIcon from '@mui/icons-material/Close'
import { useGetUser } from "services/user.service";

const ProfilePage = () => {
  const { t } = useTranslation("common");
  const [openModal, setOpenModal] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [img, setImg] = useState('')

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      surname: "",
      gender: "",
      birthday: "",
      phone: '',
      avatar: ''
    },
  });

  const { data: getUserData } = useGetUser()
  const [selectedDate, setSelectedDate] = useState('');

  const [infoUserName, setInfoUserName] = useState('')
  const [infoUserSurName, setInfoUserSurName] = useState('')
  const [infoUserEmail, setInfoUserEmail] = useState('')
  const [infoUserPhone, setInfoUserPhone] = useState('')


  const handleDateChange = (val) => {
    const formattedDate = val.format('YYYY-MM-DD');
    setSelectedDate(formattedDate)
  }

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleImgChange = (e) => {
    setImg(e.target.files[0]);
  }

  const handleChangeInfo = (e) => {
    setInfoUserName(e.target.value)
  }

  const handleChangeInfoSurName = (e) => {
    setInfoUserSurName(e.target.value)
  }

  const handleInfoUserEmail = (e) => {
    setInfoUserEmail(e.target.value)
  }

  const handleInfoUserPhone = (e) => {
    setInfoUserPhone(e.target.value)
  }

  useEffect(() => {
    setInfoUserName(getUserData?.data?.name)
    setInfoUserSurName(getUserData?.data?.surname)
    setInfoUserEmail(getUserData?.data?.email)
    setInfoUserPhone(getUserData?.data?.phone)

    if (getUserData && getUserData.data) {
      setValue("name", getUserData.data.name);
      setValue("surname", getUserData.data.surname);
      setValue('email', getUserData.data.email)
      setValue('phone', getUserData.data.phone)
      setValue('gender', getUserData.data.gender)
      setValue('birthday', getUserData.data.birthday)
    };
  }, [getUserData, setValue])


  const userInfo = async (credentials) => {
    const response = await requestPayzone.post('/api/profile', credentials);
    return response;
  };

  const mutation = useMutation(userInfo, {
    onSuccess: (data) => {
      toast.success("Sizning ma'lumotlarnigiz saqlandi!",
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
      setTimeout(() => {
        const currentUrl = window.location.href;
        window.location.href = currentUrl
      }, 3000);
    },
    onError: (error) => {
      const errorMessage = extractErrorMessage(error);
      toast.error(errorMessage,
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
    },
  });

  const extractErrorMessage = (error) => {
    let firstError = [];
    if (error.data && error.data.message && error.data.errors) {
      const errors = error.data.errors;
      Object.keys(errors).forEach((key) => {
        errors[key].forEach((message) => {
          firstError.push(message);
        });
      });
    } else if (error.data && error.data.message) {
      return error.data.message
    }
    return firstError.join(' ');
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("surname", data.surname);
    formData.append("gender", (selectedGender) ? selectedGender : getUserData.data.gender);
    formData.append("birthday", selectedDate);
    formData.append("phone", data.phone);
    formData.append("profile_image", img);
    mutation.mutate(formData);
  };

  return (
    <>
      <div className={styles.info}>
        <h1 className={styles.title}>{t("My Info")}</h1>
        <div className={styles.myInfo}>
          <div className={styles.img_wrapper}>
            <img src={(getUserData && getUserData.data && !getUserData.data.avatar.endsWith('storage')) ? getUserData.data.avatar : image} alt="profile" />
            <div className={styles.btn_wrapper}>
              <button
                variant="contained"
                onMouseEnter={() => setHoveredIndex(0)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setOpenModal(true)}
              >
                <ChangeIconButton
                  className="button_img"
                  fill={hoveredIndex === 0 ? "#00d44a" : "#102838"}
                />
              </button>
            </div>
          </div>

          <div className={styles.myInfo_content}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.inputs}>
                <div className={styles.inputs_wrapper}>
                  <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={12} md={6}>
                      <div className={styles.inputs_content}>
                        <label>{t("Firstname")}</label>
                        <div className={styles.input}>
                          <input
                            type="text"
                            name="name"
                            value={infoUserName}
                            placeholder={t("Firstname")}
                            {...register('name', { required: true })}
                            style={errors.fullname ? { borderColor: "#F76659" } : {}}
                            onChange={handleChangeInfo}
                          />
                        </div>
                      </div>
                    </Grid>



                    <Grid item xs={12} md={6}>
                      <div className={styles.inputs_content}>
                        <label>{t("Lastname")}</label>
                        <div className={styles.input}>
                          <input
                            type="text"
                            name="surname"
                            placeholder={t("Lastname")}
                            value={infoUserSurName}
                            {...register('surname', { required: true })}
                            style={errors.fullname ? { borderColor: "#F76659" } : {}}
                            onChange={handleChangeInfoSurName}
                          />
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </div>

                <div className={styles.inputs_wrapper}>
                  <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={12} md={6}>
                      <div className={styles.inputs_content}>
                        <label>{t("DateofBirth")}</label>
                        <div className={`${styles.input} ${styles.inputFocus}`}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['MobileDatePicker']}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  border: 'none',
                                },
                              }}
                            >
                              <MobileDatePicker
                                value={dayjs((getUserData && getUserData.data) ? getUserData.data.birthday : '2022-04-17')}
                                onChange={handleDateChange}
                                sx={{
                                  '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none',
                                  },
                                }}
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                        </div>
                      </div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <div className={styles.inputs_content}>
                        <label>{t("Gender")}</label>
                        <div className={styles.inputs_content_radio}>
                          <div
                            className={`${styles.radioInputs} ${(selectedGender || (getUserData && getUserData.data.gender)) === "male" ? styles.activeRadio : ""
                              }`}
                          >
                            <label
                              htmlFor="male"
                              className={
                                (selectedGender || (getUserData && getUserData.data.gender)) === "male"
                                  ? styles.activeLabel
                                  : ""
                              }
                            >
                              {t("Male")}
                            </label>

                            <input
                              type="radio"
                              id="male"
                              name="gender"
                              value="male"
                              checked={(selectedGender || (getUserData && getUserData.data.gender)) === "male"}
                              onChange={handleGenderChange}
                            />

                          </div>

                          <div
                            className={`${styles.radioInputs} ${(selectedGender || (getUserData && getUserData.data.gender)) === "female" ? styles.activeRadio : ""
                              }`}
                          >
                            <label
                              htmlFor="female"
                              className={
                                (selectedGender || (getUserData && getUserData.data.gender)) === "female"
                                  ? styles.activeLabel
                                  : ""
                              }
                            >
                              {t("Female")}
                            </label>

                            <input
                              type="radio"
                              id="female"
                              name="gender"
                              value="female"
                              checked={(selectedGender || (getUserData && getUserData.data.gender)) === "female"}
                              onChange={handleGenderChange}
                            />

                          </div>
                        </div>
                      </div>
                    </Grid>
                  </Grid>

                </div>


                <div className={styles.inputs_wrapper}>
                  <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={12} md={6}>
                      <div className={styles.inputs_content}>
                        <label>{t("E-mail")}</label>
                        <div className={styles.input}>
                          <input
                            type="email"
                            placeholder={t("E-mail")}
                            value={infoUserEmail}
                            onChange={handleInfoUserEmail}
                          />
                        </div>
                      </div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <div className={styles.inputs_content}>
                        <label>{t("Phonenumber")}</label>
                        <div className={styles.input}>
                          <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => (
                              <input
                                {...field}
                                placeholder={t("Phonenumber")}
                                defaultCountry="UZ"
                                name='phone'
                                value={infoUserPhone}
                                style={errors.phoneNumber ? { borderColor: "#F76659" } : {}}
                                className="profilePhone"
                                {...register('phone', { required: true })}
                                onChange={handleInfoUserPhone}
                              />
                            )}
                          />
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </div>

              <div className={styles.btn}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    borderRadius: "10px",
                    fontSize: "20px",
                    width: "max-content",
                    padding: "12px 48px 12px 48px",
                    fontSize: "16px",
                    fontWeight: "600",
                    fontFamily: "Montserrat",
                    lineHeight: "17.7px"
                  }}
                >
                  {(getUserData && getUserData.data) ? t("Edit") : t("Save")}
                </Button>
              </div>
            </form>
          </div>


        </div>
      </div>

      <Modal open={openModal} handleClose={handleClose}>
        <div className={styles.login_wrapper}>
          <h1 className={styles.title}>{t("Upload Your Image")}</h1>
          <span
            className={styles.cancelIcon}
            onClick={() => setOpenModal(false)}
          >
            <CancelIcon />
          </span>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputs}>
              <div className={styles.input}>
                <input
                  type="file"
                  onChange={handleImgChange}
                  // {...register('avatar', {required: true})}
                  placeholder="Upload image..."
                />
              </div>
            </div>

            <Button
              variant="contained"
              fullWidth={true}
              sx={{ borderRadius: "10px", fontSize: "20px" }}
              onClick={handleClose}
            >
              {t("Change")}
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ProfilePage;
