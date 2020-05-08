import React from "react";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <header className="App-home">
        <NavLink to="/charts">
          <h1>definitely.</h1>
          <div className="subtitle">Click here to look at the stats</div>
        </NavLink>
      </header>
      <Footer />
    </>
  );
};

export default Home;
