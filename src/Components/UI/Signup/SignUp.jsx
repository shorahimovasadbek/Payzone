import React, { useState } from "react";
import { Button, Checkbox } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import styles from "../Login/Login.module.scss";
import { useMutation } from 'react-query';
import { requestPayzone } from "services/http-client";
import { ToastContainer, toast } from 'react-toastify';
import { useModal } from "../useContextSignInSignUp/ModalOpenClose";
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from '@mui/icons-material/Close'

import { t } from "i18next";
import {
  AppleIcon,
  CancelIcon,
  CloseEyeIcon,
  GoogleIcon,
  OpenEyeIcon,
} from "helpers/Protected/icons";
import { Link } from "react-router-dom";

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const {closeSignUpModal, openLoginModal} = useModal()

  

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleModalClose = () => {
    closeSignUpModal();
    reset();
  };

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordToggle1 = () => {
    setPasswordVisible1(!passwordVisible1);
  }

  const signUpUser = async (credentials) => {
    const response = await requestPayzone.post('/api/register', credentials);
    return response;
  };
  
  const mutation = useMutation(signUpUser, {
    onSuccess: (data) => {
      localStorage.setItem('JWT_Pay', data.token.access_token)
      toast.success("Muvaffaqiyatli ro'yxatdan o'tdingiz!",
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
        handleModalClose();
        const currentUrl = window.location.href;
        window.location.href = currentUrl
      }, 2000);
    },
    onError: (error) => {
      const errorMessage = extractErrorMessage(error);
      toast.error(errorMessage,
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
    }
    return firstError.join(' ');
  };

  const onSubmit = (data) => {
    mutation.mutate({
      name: data.name,
      phoneNumber: data.phoneNumber,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,

    });
  };

  return (
    <div className={styles.login_wrapper}>
      <h1 className={styles.title}>{t("Welcome to PayZone!")}</h1>
      <span className={styles.cancelIcon} onClick={handleModalClose}>
        <CancelIcon />
      </span>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputs}>
          <div className={styles.input}>
            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: true })}
              style={errors.fullname ? { borderColor: "#F76659" } : {}}
            />
          </div>
          {errors.fullname && (
            <p className={styles.errorMessage}>Pleace write full name</p>
          )}
          <div className={styles.input}>
            <Controller
              name="phone Number"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  placeholder="Phone Number (optional)"
                  defaultCountry="US"
                  style={errors.phoneNumber ? { borderColor: "#F76659" } : {}}
                  className="signupPhone"
                />
              )}
            />
          </div>

          <div className={styles.input}>
            <input
              type="email"
              placeholder="E-mail"
              {...register("email", { required: true })}
              style={errors.email ? { borderColor: "#F76659" } : {}}
            />
          </div>
          {errors.email && (
            <p className={styles.errorMessage}>Pleace write correct email</p>
          )}
          <div className={styles.input}>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              {...register("password", { required: true })}
              style={errors.password ? { borderColor: "#F76659" } : {}}
            />
            <span onClick={handlePasswordToggle} className={styles.eyeIcon}>
              {passwordVisible ? <OpenEyeIcon /> : <CloseEyeIcon />}
            </span>
          </div>
          {errors.password && (
            <p className={styles.errorMessage}>Please create a password</p>
          )}

          <div className={styles.input}>
            <input
              type={passwordVisible1 ? "text" : "password"}
              placeholder="Confirm Password"
              {...register("password_confirmation", {
                required: true,
                validate: (value) =>
                  value === watch("password") || "Passwords do not same",
              })}
              style={errors.confirmPassword ? { borderColor: "#F76659" } : {}}
            />
            <span onClick={handlePasswordToggle1} className={styles.eyeIcon}>
              {passwordVisible1 ? <OpenEyeIcon /> : <CloseEyeIcon />}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className={styles.errorMessage}>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className={styles.btn_wrapper}>
          <div className={styles.agreement}>
            <Checkbox
              sx={{
                color: "#00d44a",
                "&.Mui-checked": {
                  color: "#00d44a",
                },
              }}
            />
            <p>
              {t("I agree with ")} <Link to='/terms-conditions' onClick={closeSignUpModal}>terms & conditions</Link>
            </p>
          </div>
          <Button
            variant="contained"
            fullWidth
            sx={{
              borderRadius: "10px",
              fontSize: "20px",
              textTransform: "capitalize",
            }}
            type="submit"
          >
            {t("Sign up")}
          </Button>
        </div>
      </form>

      <div className={styles.links}>
        <p className={styles.content}>
          {t("Already have an account? ")}
          <p
            onClick={() =>
              closeSignUpModal() || openLoginModal() || reset()
            }
          >
            {t("Login")}
          </p>
        </p>
        <div className={styles.text}>
          <span>{t("Login with")}</span>
        </div>
        <div className={styles.btns}>
          <div className={styles.btn}>
            <GoogleIcon />
            <p>Google</p>
          </div>
          <div className={styles.btn}>
            <AppleIcon />
            <p>Apple</p>
          </div>
        </div>
      </div>
      <ToastContainer containerId="containersignUp" />
    </div>
  );
};

export default Signup;
