import { useRoutes } from "react-router-dom";
import Products from "pages/Products/Products";
import ProductsById from "pages/ProductsById/ProductsById";
import NotFound from "pages/NotFound/NotFound";
import ProductsLayout from "./Components/ProductsLayout/ProductsLayout";
import Main from "pages/Main/Main";
import Card from "pages/Card/Card";
import Profile from "pages/Profile/Profile";
import SingleGame from "pages/SingleGame/SingleGame";
import Steam from "pages/Steam/Steam";
import MyPayments from "pages/MyPayments/MyPayments";
import PaymentMethods from "pages/PaymentMethods/PaymentMethods";
import MyProfile from "pages/MyProfile/MyProfile";
import Contact from "pages/Contact/Contact";
import { Terms_conditions } from "pages/Terms_Conditions/Terms_conditions";
import  GamesPages  from "pages/GamesPages/GamesPages";
import { SearchSection } from "pages/SearchSection/SearchSection";
import SearchUcFill from "pages/SearchUcFill/SearchUcFill";

export const Routes = () =>
  useRoutes([
    {
      path: "/",
      element: <Main />,
    },

    {
      path: "/card",
      element: <Card />,
    },
    {
      path: "/products",
      element: <ProductsLayout />,
      children: [
        {
          index: true,
          element: <Products />,
        },
        {
          path: ":id",
          element: <ProductsById />,
        },
      ],
    },
    {
      path: "/single-game/:id",
      element: <SingleGame />,
    },
    {
      path: "/profile",
      element: <Profile />,
      children: [
        {
          index: true,
          element: <MyProfile />,
        },
        {
          path: "my-payments",
          element: <MyPayments />,
        },
        {
          path: "payment-methods",
          element: <PaymentMethods />,
        },
      ],
    },
    {
      path: "/steam",
      element: <Steam />,
    },
    {
      path: "/contact",
      element : <Contact/>
    },
    {
      path: "/game-lists",
      element : <GamesPages/>
    },
    {
      path: "/search-answers/:params",
      element : <SearchSection/>
    },
    {
      path: "/search-answers-uc/:params",
      element : <SearchUcFill/>
    },
    {
      path: "/terms-conditions",
      element : <Terms_conditions/>
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
