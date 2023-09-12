import { useState } from "react";
import Content from "./components/Content";
import Hero from "./components/Hero";

import "./style/App.css";
import { useEffect } from "react";

function App() {
  const [theme, setTheme] = useState(false);
  const element = document.documentElement;
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function onWindowMatch() {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && darkQuery.matches)
    ) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }

  onWindowMatch();

  useEffect(() => {
    if (theme) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }, [theme]);

  return (
    <>
      <Hero theme={theme} />
      <Content theme={theme} setTheme={setTheme} />
    </>
  );
}

export default App;
