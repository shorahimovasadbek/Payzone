import React, { useState } from "react";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import styles from "../Login/Login.module.scss";
import { t } from "i18next";
import {
  AppleIcon,
  CancelIcon,
  GoogleIcon,
} from "helpers/Protected/icons";
import OTPInput from "react-otp-input";

const VerifyOTP = ({ setOpenModalOTP, setOpenModalSignup }) => {
  const [otp, setOtp] = useState("");

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

  const handleOTPModalClose = () => {
    setOpenModalOTP(false);
    reset();
  };

  const onSubmit = (data) => {
    handleOTPModalClose();
  };

  const switchToSignupModal = () => {
    setOpenModalOTP(false);
    setOpenModalSignup(true);
    reset();
  };

  return (
    <div className={styles.login_wrapper}>
      <h1 className={styles.title}>{t("Verifying")}</h1>
      <span className={styles.cancelIcon} onClick={handleOTPModalClose}>
        <CancelIcon />
      </span>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.otp_wrapper}>
            <h3>Enter code that we sent to your email</h3>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => <input {...props} />}
            />
            <p>Send again</p>
          {errors.email && (
            <p className={styles.errorMessage}>Write correct email </p>
          )}
        </div>

        <Button
          type="submit"
          variant="contained"
          sx={{ borderRadius: "10px", fontSize: "20px" }}
        >
          {t("Login")}
        </Button>
      </form>

      <div className={styles.links}>
        <p className={styles.content}>
          {t("Don’t have an account? ")}
          <p onClick={switchToSignupModal}>{t("Sign up")}</p>
        </p>
        {/* <p className={styles.content}>
          {t("Forgot your password? ")}
          <p href="/reset">{t("Reset")}</p>
        </p> */}
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
    </div>
  );
};

export default VerifyOTP;
