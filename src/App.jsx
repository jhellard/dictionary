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
    document.querySelector("#nav_list").classList.toggle("hidden");
  };

  const handleFontSelect = (fontName, fontClass) => {
    document.querySelector("#nav_list").classList.toggle("hidden");
    setUserFont({
      name: fontName,
      class: fontClass,
    });
  };

  if (isLoading) return <Loading />;

  return (
    <main className={`w-contained pt-6 mx-auto ${userFont.class}`}>
      <header className="min-h-[32px] mb-6 flex justify-between items-center">
        <img src={Logo} alt="Dictionary Logo" />
        <nav className="flex relative">
          <span className="font-bold mr-[18px]">{userFont.name}</span>
          <button
            className="border-none bg-transparent p-0 mr-[26px] cursor-pointer"
            onClick={handleModal}
          >
            <img src={Arrow} alt="Font dropdown arrow" />
          </button>
          <div className="w-[1px] bg-lightGray"></div>
          <ul
            className="hidden absolute m-0 p-6 w-[183px] right-5 top-[30px] bg-white list-none rounded-2xl cursor-pointer shadow-xl"
            id="nav_list"
          >
            <li
              className="mb-4 font-bold sans hover:text-purple"
              onClick={() => handleFontSelect("Sans Serif", "sans")}
            >
              Sans Serif
            </li>
            <li
              className="mb-4 font-bold serif hover:text-purple"
              onClick={() => handleFontSelect("Serif", "serif")}
            >
              Serif
            </li>
            <li
              className="font-bold mono hover:text-purple"
              onClick={() => handleFontSelect("Mono", "mono")}
            >
              Mono
            </li>
          </ul>
        </nav>
      </header>
      <form
        onSubmit={(e) => handleInput(e)}
        className="flex justify-between rounded-2xl bg-input mb-6"
      >
        <input
          required
          className="pl-6 min-h-[48px] w-full border-none bg-transparent font-bold focus:outline-none"
          type="text"
          ref={userWord}
          placeholder="Search for any word..."
        />
        <button className="border-none bg-transparent pr-6">
          <img src={Search} alt="Search Button" />
        </button>
      </form>
      {isError && <ErrorPage error={error.response.data} />}
      {isSuccess && <Word data={data[0]} />}
    </main>
  );
};

export default App;
