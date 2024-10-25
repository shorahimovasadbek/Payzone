import { Navbar } from "./Components/UI/Navbar/Navbar";
import { Footer } from "./Components/UI/Footer/Footer";
import { Routes } from "./routes";
import Aos from "aos";
import "aos/dist/aos.css";
import { ModalProvider } from "Components/UI/useContextSignInSignUp/ModalOpenClose";
import ScrollSectionTop from "Components/UI/ScrollTop/ScrollSectionTop";
// import ClientChat from "Components/UI/ClientChat/ClientChat";

Aos.init({
  once: true,
});

function App() {
  return (
    <ModalProvider>
      <div className="app">
        <ScrollSectionTop/>
        <Navbar />
        {Routes()}
        <Footer />
        {/* <span className="chaticon">
        <ClientChat />
      </span> */}
      </div>
    </ModalProvider>
  );
}

export default App;
