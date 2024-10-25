import React, { useEffect } from "react";
import styles from "./Profile.module.scss";
import {
  Box,
  Container,
} from "@mui/material";
import {
  PaymentMethod,
  PaymentProfileIcon,
  UserIcon,
} from "helpers/Protected/icons";
import { useTranslation } from "react-i18next";
import { Link, Outlet, useLocation } from "react-router-dom";

const drawerdata = [
  {
    icon: (props) => <PaymentProfileIcon {...props} />,
    title: "My payments",
    link: "my-payments",
  },
  {
    icon: (props) => <PaymentMethod {...props} />,
    title: "Payment methods",
    link: "payment-methods",
  },
];

const Profile = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation("common");

  useEffect(() => {
    if (pathname === 'profile') {
      const script = document.createElement('script');
      script.src = "https://cdn.livechatinc.com/tracking.js";
      script.async = true;
      script.onload = () => {
        window.__lc = window.__lc || {};
        window.__lc.license = 18656454;
        window.__lc.integration_name = "manual_onboarding";
        window.__lc.product_name = "livechat";

        window.LiveChatWidget = window.LiveChatWidget || {
          _q: [],
          _h: null,
          _v: "2.0",
          on: function () { this._q.push(["on", ...arguments]) },
          once: function () { this._q.push(["once", ...arguments]) },
          off: function () { this._q.push(["off", ...arguments]) },
          get: function () { if (!this._h) throw new Error("[LiveChatWidget] You can't use getters before load."); return this._q.push(["get", ...arguments]) },
          call: function () { this._q.push(["call", ...arguments]) }
        };
      };

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [pathname]);



  const drawer = (
    <div className={styles.list}>
      <Link to="/profile">
        <div
          className={`${styles.list_item} ${pathname === "/profile" && styles.list_item_active
            }`}
        >
          <UserIcon fill={pathname === "/profile" ? "#00d44a" : "#869AB2"} />
          <h4>Profile</h4>
        </div>
      </Link>
      {/* <p className={styles.list_payments_title}>{t("Payments")}</p> */}
      <div className={styles.list_payments}>
        {drawerdata?.map((data) => (
          <Link key={data.link} to={data.link}>
            <div
              className={`${styles.list_item} ${pathname.includes(data.link) && styles.list_item_active
                }`}
            >
              {data.icon({
                stroke: pathname.includes(data.link) ? "#00d44a" : "#869AB2",
              })}
              <h4>{data.title}</h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <>

      <div className={styles.profile}>
        <div className={styles.profile_sidebar}>
          <div className={styles.profile_sidebar_inner}>{drawer}</div>
        </div>
        <Container>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - 100px)` },
            }}
          >
            <div className={styles.profile_wrapper}>
              <Outlet />
            </div>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default Profile;
