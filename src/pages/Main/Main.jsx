import React from "react";
import Games from "Components/UI/Games/Games";
import Advertisement from "Components/UI/Advertisement/Advertisement";
import MarqueeElem from "Components/UI/Marquee/Marquee";
import Players from "Components/UI/Players/Players";
import Testimonials from "Components/UI/Testimonials/Testimonials";
import FAQ from "Components/UI/FAQ/FAQ";

const Main = () => {

  return (
    <div className="main_wrapper">
      <Games />
      <div className="little_about">
        <Advertisement />
      </div>
      <MarqueeElem />
      <Players />
      <Testimonials/>
      <MarqueeElem />
      <FAQ/>
    </div>
  );
};

export default Main;
