import React, { useState } from "react";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import { useMutation } from 'react-query';
import { requestPayzone } from "services/http-client";
import { ToastContainer, toast } from 'react-toastify';
import { useModal } from "../useContextSignInSignUp/ModalOpenClose";
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from '@mui/icons-material/Close';
import { t } from "i18next";
import {
  AppleIcon,
  CancelIcon,
  CloseEyeIcon,
  GoogleIcon,
  OpenEyeIcon,
} from "helpers/Protected/icons";

const Login = () => {
  const { closeLoginModal, openSignUpModal } = useModal();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginUser = async (credentials) => {
    const response = await requestPayzone.post('/api/login', credentials);
    return response;
  };

  const mutation = useMutation(loginUser, {
    onSuccess: (data) => {
      localStorage.setItem('JWT_Pay', data.token.access_token)
      toast.success("Xush kelibsiz!!!",
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
        handleLoginModalClose();
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
    mutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  const handleLoginModalClose = () => {
    closeLoginModal()
    reset();
  };

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };


  const switchToSignupModal = () => {
    closeLoginModal()
    openSignUpModal();
    reset();
  };


  return (
    <div className={styles.login_wrapper}>
      <h1 className={styles.title}>{t("Welcome Back!")}</h1>
      <span className={styles.cancelIcon} onClick={handleLoginModalClose}>
        <CancelIcon />
      </span>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputs}>
          <div className={styles.input}>
            <input
              type="email"
              placeholder="E-mail"
              {...register("email", { required: "E-mail is required" })}
              style={errors.email ? { borderColor: "#F76659" } : {}}
            />
          </div>
          {errors.email && (
            <p className={styles.errorMessage}>Write correct email </p>
          )}
          <div className={styles.input}>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              style={errors.password ? { borderColor: "#F76659" } : {}}
            />
            <span
              onClick={handlePasswordToggle}
              className={styles.eyeIcon}
            >
              {passwordVisible ? <OpenEyeIcon /> : <CloseEyeIcon />}
            </span>
          </div>
          {errors.password && (
            <p className={styles.errorMessage}>{errors.password.message}</p>
          )}
        </div>

        <Button
          type='submit'
          variant="contained"
          sx={{ borderRadius: "10px", fontSize: "20px", textTransform: "capitalize" }}
        >
          {t("Login")}
        </Button>
      </form>

      <div className={styles.links}>
        <p className={styles.content}>
          {t("Don’t have an account? ")}
          <p onClick={switchToSignupModal}>{t("Sign up")}</p>
        </p>
        <p className={styles.content}>
          {t("Forgot your password? ")}
          <p href="/reset">{t("Reset")}</p>
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
      <ToastContainer containerId="containerLogin" />
    </div>
  );
};

export default Login;
