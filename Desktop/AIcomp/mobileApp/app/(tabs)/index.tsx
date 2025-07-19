import React, { useState } from "react";
import WelcomePage from "../(root)/welcomepage";
import HomePage from "./home";

export default function Index() {
  const [showHomePage, setShowHomePage] = useState(false);

  const handleGetStarted = () => {
    setShowHomePage(true);
  };

  if (showHomePage) {
    return <HomePage />;
  }

  return <WelcomePage onGetStarted={handleGetStarted} />;
}
