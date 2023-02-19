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

  const handleThemeToggle = () => {
    const root = document.querySelector("#root");
    document.documentElement.classList.toggle("dark");
    root.classList.toggle("bg-veryBlack");
    root.classList.toggle("min-h-screen");
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <header className="w-contained mx-auto px-6 pt-6 sm:pt-[58px] min-h-[32px] pb-6 sm:pb-[52px] flex items-center dark:text-white dark:bg-veryBlack">
        <img className="mr-auto" src={Logo} alt="Dictionary Logo" />
        <nav className="flex relative">
          <span className="font-bold mr-[18px] text-sm sm:text-lg">
            {userFont.name}
          </span>
          <button
            className="border-none bg-transparent p-0 mr-[26px] cursor-pointer"
            onClick={handleModal}
          >
            <img src={Arrow} alt="Font dropdown arrow" />
          </button>
          <div className="w-[1px] bg-lightGray mr-[26px]"></div>
          <ul
            className="hidden absolute m-0 p-6 w-[183px] right-5 top-[30px] bg-white list-none rounded-2xl cursor-pointer shadow-2xl dark:bg-darkerBlack dark:shadow-purple z-10"
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
        <div className="grid place-items-center relative w-[40px] mr-5">
          <label className="absolute w-full h-[20px] rounded-[50px] cursor-pointer">
            <input
              className="absolute hidden"
              type="checkbox"
              onClick={() => handleThemeToggle()}
            />
            <span className="absolute w-full h-full rounded-[50px] duration-300 slider"></span>
          </label>
        </div>
        <svg
          className="text-darkGray dark:text-purple"
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 22 22"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
          />
        </svg>
      </header>
      <main
        className={`w-contained mx-auto ${userFont.class} px-6 dark:bg-veryBlack`}
      >
        <form
          onSubmit={(e) => handleInput(e)}
          className="flex justify-between rounded-2xl bg-input mb-6 sm:mb-[50px] dark:bg-darkerBlack dark:text-white"
        >
          <input
            required
            className="pl-6 min-h-[48px] sm:min-h-[64px] sm:text-xl w-full border-purple bg-transparent font-bold focus:outline-none placeholder:opacity-50 dark:placeholder:opacity-25 dark:placeholder:text-white"
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
    </>
  );
};

export default App;
