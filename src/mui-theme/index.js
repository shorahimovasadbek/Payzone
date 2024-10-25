import { createTheme } from "@mui/material";
import { rem } from "utils/pxToRem";

export default createTheme({
  palette: {
    primary: {
      main: "#00D44A",
      dark: "#00122A",
      light: "#FCFFFA",
      gray: "#1E1E1E",
    },
    gradient: {
      main: "linear-gradient(77.5deg, #00D44A -31.33%, #11E35A -19.3%, #0AB847 -4.45%, #0FB849 11.89%, #25B758 29.28%, #00D44A 47.54%, #29FE73 66.2%, #3FFF82 81.84%)",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "@media (max-width: 768px)": {},
          "&:hover": {},
          svg: {
            maxWidth: "20px",
            minWidth: "20px",
            maxHeight: "20px",
            minHeight: "20px",
            marginRight: 0,
          },
        },
        outlined: {
          color: "#00D44A",
          "&:hover": {
            color: "#00122A",
            background: "linear-gradient(77.5deg, #00D44A -31.33%, #11E35A -19.3%, #0AB847 -4.45%, #0FB849 11.89%, #25B758 29.28%, #00D44A 47.54%, #29FE73 66.2%, #3FFF82 81.84%)",
          },
          "@media (max-width: 1000px)": {
            fontSize: "15px",
          },
        },
        contained: {
          color: "#00172B",
          background: "linear-gradient(77.5deg, #00D44A -31.33%, #11E35A -19.3%, #0AB847 -4.45%, #0FB849 11.89%, #25B758 29.28%, #00D44A 47.54%, #29FE73 66.2%, #3FFF82 81.84%)",
          border: "1px solid",
          "&:hover": {
            color: "#00D44A",
            background: "#00172B",
            borderColor: "#00D44A",
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: rem(16),
          paddingRight: rem(16),
          "@media (min-width:1440px)": {
            maxWidth: "1248px",
            width: "100%",
          },
          "@media (min-width:1200px)": {
            paddingLeft: rem(16),
            paddingRight: rem(16),
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          maxWidth: "none",
        },
      },
    },
  },
  typography: {
    fontFamily: "Inter",
    h1: {
      fontSize: rem(56),
      fontWeight: 700,
      lineHeight: rem(64),
      color: "#fff",
      "@media (max-width: 768px)": {
        fontSize: rem(16),
        fontWeight: 400,
        lineHeight: rem(20),
        color: "#fff",
      },
    },
  },
  
});
