import React, { useRef, useState } from "react";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Word from "./components/Word";
import Loading from "./components/Loading";
import ErrorPage from "./components/ErrorPage";
import Logo from "./assets/images/logo.svg";
import Search from "./assets/images/icon-search.svg";
import Arrow from "./assets/images/icon-arrow-down.svg";

const App = () => {
  const queryClient = useQueryClient();
  const userWord = useRef("keyboard");
  const [userFont, setUserFont] = useState({
    name: "Sans Serif",
    class: "sans",
  });

  const { isLoading, isSuccess, isError, error, data } = useQuery(
    ["word"],
    () =>
      axios
        .get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${
            userWord.current === "keyboard"
              ? userWord.current
              : userWord.current.value
          }`
        )
        .then((res) => res.data)
  );

  const handleInput = (e) => {
    e.preventDefault();
    queryClient.invalidateQueries(["word"]);
  };

  const handleModal = () => {
    const modal = document.querySelector(".nav__list");

    modal.style.display = modal.style.display === "block" ? "none" : "block";
  };

  const handleFontSelect = (fontName, fontClass) => {
    const modal = document.querySelector(".nav__list");

    modal.style.display = "none";
    setUserFont({
      name: fontName,
      class: fontClass,
    });
  };

  if (isLoading) return <Loading />;

  return (
    <main className={`width main ${userFont.class}`}>
      <header className="header">
        <img src={Logo} alt="Dictionary Logo" />
        <nav className="nav">
          <span className="nav__font">{userFont.name}</span>
          <button className="nav__toggle" onClick={handleModal}>
            <img src={Arrow} alt="Font dropdown arrow" />
          </button>
          <div className="nav__line"></div>

          <ul className="nav__list">
            <li
              className="nav__item sans"
              onClick={() => handleFontSelect("Sans Serif", "sans")}
            >
              Sans Serif
            </li>
            <li
              className="nav__item serif"
              onClick={() => handleFontSelect("Serif", "serif")}
            >
              Serif
            </li>
            <li
              className="nav__item mono"
              onClick={() => handleFontSelect("Mono", "mono")}
            >
              Mono
            </li>
          </ul>
        </nav>
      </header>
      <form onSubmit={(e) => handleInput(e)} className="search">
        <input
          required
          className="search__input"
          type="text"
          ref={userWord}
          placeholder="Search for any word..."
        />
        <button className="search__button">
          <img src={Search} alt="Search Button" />
        </button>
      </form>
      {isError && <ErrorPage error={error.response.data} />}
      {isSuccess && <Word data={data[0]} />}
    </main>
  );
};

export default App;
